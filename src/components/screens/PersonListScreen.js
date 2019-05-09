import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    FlatList,
    ActivityIndicator
} from "react-native";
import { SearchBar } from "react-native-elements";
import { isNil, isEmpty } from "ramda";

import { changePersonsSearchQuery, loadMorePersons, loadPersons } from "../../store/reducers/persons";
import PersonListItem from "../common/PersonListItem";
import { selectPersons } from "../../store/selectors/persons";
import { WebView } from "react-native-webview";
import { BUILDING_ROUTE_TO, ROUTES } from "../../utils/navigation";
import { loadPersonNowLesson } from "../../store/reducers/schedule";


class PersonListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url:             '',
            isWebViewOpened: false
        }
    }

    static navigationOptions = () => {
        return {
            title: 'Поиск по преподавателям и сотрудникам'
        };
    };


    componentDidMount() {
        if (this.isDataEmpty) {
            this.loadPersons();
        }
    }


    renderSeparator = () => {
        return (
            <View
                style={ {
                    height:          1,
                    width:           "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft:      "14%"
                } }
            />
        );
    };

    renderHeader = () => {
        const { searchQuery } = this.props;

        return (
            <SearchBar
                platform={ "android" }
                placeholder="Введите текст..."
                lightTheme
                round
                onChangeText={ text => this.props.changePersonsSearchQuery(text) }
                value={ searchQuery }
            />
        );
    };

    renderFooter = () => {
        if (!this.props.loading) return null;

        return (
            <View
                style={ {
                    paddingVertical: 20,
                    borderTopWidth:  1,
                    borderColor:     "#CED0CE"
                } }
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    onOpenUrl = (url) => {
        console.log("Open url: " + url);
        this.setState({ isWebViewOpened: true, url: url });
    };

    onRouteClick = (personId) => {
        this.props.loadPersonNowLesson(personId);
        this.props.navigation.navigate(ROUTES.BuildingMap, {
            params: {
                personId
            },
            from:   ROUTES.PersonList
        })
    };

    renderItem = ({ item }) => {

        return (
            <PersonListItem
                id={ item.id }
                url={ item.url }
                openUrl={ this.onOpenUrl }
                fio={ item.fio }
                avatarUrl={ item.avatarUrl }
                faculties={ item.faculties }
                getRoute={ this.onRouteClick }
            />
        )
    };

    loadPersons = () => {
        const { loadPersons, searchQuery } = this.props;
        loadPersons(searchQuery);
    };

    loadMorePersons = () => {
        const { loadMorePersons, searchQuery, loading } = this.props;
        if (!loading) {
            loadMorePersons(searchQuery);
        }
    };

    get isDataEmpty() {
        const { data } = this.props;

        return isNil(data) || isEmpty(data);
    }

    render() {


        if (this.state.isWebViewOpened) {

            return (
                <WebView
                    source={ { uri: this.state.url } }
                />
            )
        }


        if (this.isDataEmpty) {

            return (
                <View>
                    <FlatList
                        ListHeaderComponent={ this.renderHeader() }
                        ListFooterComponent={ this.renderFooter }
                    />
                </View>
            )
        }

        return (
            <View>
                <FlatList
                    data={ this.props.data }
                    renderItem={ this.renderItem }
                    keyExtractor={ item => item.id }
                    ItemSeparatorComponent={ this.renderSeparator }
                    ListHeaderComponent={ this.renderHeader() }
                    ListFooterComponent={ this.renderFooter }
                    onEndReached={ this.loadMorePersons }
                    onEndReachedThreshold={ 0.3 }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    loading:     state.persons.loading,
    data:        selectPersons(state),
    searchQuery: state.persons.searchQuery,
    error:       state.persons.error
});


const mapDispatchToProps = dispatch => bindActionCreators({
    changePersonsSearchQuery: changePersonsSearchQuery,
    loadPersons:              loadPersons,
    loadMorePersons:          loadMorePersons,
    loadPersonNowLesson:      loadPersonNowLesson
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonListScreen);
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    FlatList,
    ActivityIndicator
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { isNil, isEmpty } from "ramda";

import { changePersonsSearchQuery, loadMorePersons, loadPersons } from "../../store/reducers/persons";
import PersonListItem from "../common/PersonListItem";


class PersonListScreen extends Component {

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

    renderItem = ({ item }) => {


        return (
            <PersonListItem
                firstName={ item.name.first }
                lastName={ item.name.last }
                email={ item.email }
                avatarUrl={ item.picture.thumbnail }
            />
        )
    };

    loadPersons = () => {
        const { loadPersons, searchQuery } = this.props;
        loadPersons(searchQuery);
    };

    loadMorePersons = () => {
        console.log("on end reach invoked");
        const { loadMorePersons, searchQuery, loading } = this.props;
        if (!loading) {
            console.log("load more ")
            loadMorePersons(searchQuery);
        }

    };

    get isDataEmpty() {
        const { data } = this.props;

        return isNil(data) || isEmpty(data);
    }

    render() {


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
                    keyExtractor={ item => item.email }
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
    data:        state.persons.personList,
    searchQuery: state.persons.searchQuery,
    error:       state.persons.error
});


const mapDispatchToProps = dispatch => bindActionCreators({
    changePersonsSearchQuery: changePersonsSearchQuery,
    loadPersons:              loadPersons,
    loadMorePersons:          loadMorePersons
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonListScreen);
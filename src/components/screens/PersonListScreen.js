import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    FlatList,
    ActivityIndicator
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

import { changePersonsSearchParams, loadPersons } from "../../store/reducers/persons";


class PersonListScreen extends Component {

    static navigationOptions = () => {
        return {
            title: 'Поиск по преподавателям и сотрудникам'
        };
    };


    componentDidMount() {
        this.props.loadPersons({});
    }


    handleSearchParamsChange = (searchQuery, page) => {
        this.props.changePersonsSearchParams({ searchQuery, page })
    };

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
        const { searchString, page } = this.props;

        return (
            <SearchBar
                platform={ "android" }
                placeholder="Введите текст..."
                lightTheme
                round
                onChangeText={ text => this.handleSearchParamsChange(text, page) }
                value={ searchString }
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
            <ListItem
                roundAvatar
                title={ `${ item.name.first } ${ item.name.last }` }
                subtitle={ item.email }
                leftAvatar={ { source: { uri: item.picture.thumbnail } } }
                containerStyle={ { borderBottomWidth: 0 } }
            />
        )
    };

    render() {

        return (
            <View>
                <FlatList
                    data={ this.props.data }
                    renderItem={ this.renderItem }
                    keyExtractor={ item => item.email }
                    ItemSeparatorComponent={ this.renderSeparator }
                    ListHeaderComponent={ this.renderHeader() }
                    ListFooterComponent={ this.renderFooter }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    loading:      state.persons.loading,
    data:         state.persons.personList,
    searchString: state.persons.searchQuery,
    error:        state.persons.error,
    page:         state.persons.page
});


const mapDispatchToProps = dispatch => bindActionCreators({
    changePersonsSearchParams: changePersonsSearchParams,
    loadPersons:               loadPersons

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PersonListScreen);
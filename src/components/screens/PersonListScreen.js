import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import _ from 'lodash';

import { getUsers, contains } from "../../api";

class PersonListScreen extends Component {


    static navigationOptions = () => {
        return {
            title: 'Поиск по преподавателям и сотрудникам'
        };
    };


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            searchString: '',
            fullData: []
        };
    }

    handleSearchStringChange = (text) => {
        this.setState({ searchString: text }, () => this.makeRemoteRequest())
    };

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = _.debounce(() => {
        this.setState({ loading: true });

        getUsers(20, this.state.searchString)
            .then(users => {
                this.setState({
                    loading: false,
                    data: users,
                    fullData: users
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }, 250);

    renderSeparator = () => {
        return (
            <View
                style={ {
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                } }
            />
        );
    };

    renderHeader = () => {
        const { searchString } = this.state;

        return (
            <SearchBar
                platform={ "android" }
                placeholder="Введите текст..."
                lightTheme
                round
                onChangeText={ this.handleSearchStringChange }
                value={ searchString }
            />
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={ {
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
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
                    data={ this.state.data }
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


export default PersonListScreen;
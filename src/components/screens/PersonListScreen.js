import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { getUsers } from "../../api";

class PersonListScreen extends Component {


    static navigationOptions = () => {
        return {
            title: 'Поиск по отрудникам и преподаватели'
        };
    };


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true });

        getUsers()
            .then(users => {
                this.setState({
                    loading: false,
                    data: users
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

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
        return <SearchBar placeholder="Type Here..." lightTheme round/>;
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
            <SafeAreaView>
                <FlatList
                    data={ this.state.data }
                    renderItem={ this.renderItem }
                    keyExtractor={ item => item.email }
                    ItemSeparatorComponent={ this.renderSeparator }
                    ListHeaderComponent={ this.renderHeader }
                    ListFooterComponent={ this.renderFooter }
                />
            </SafeAreaView>
        );
    }
}


export default PersonListScreen;
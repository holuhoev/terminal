import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

import { ROUTES } from "../../routes";


class MainMenuScreen extends Component {

    static navigationOptions = () => {
        return {
            title: 'Главное меню'
        };
    };

    render() {

        return (
            <View style={ styles.container }>
                <TouchableNativeFeedback
                    onPress={ () => this.props.navigation.navigate(ROUTES.PersonList) }
                >
                    <View style={ [styles.cell, styles.blue] }>
                        <Text style={ styles.title }>Преподаватели и сотрудники</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View style={ [styles.cell, styles.blue2] }>
                        <Text style={ styles.title }>Новости</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingVertical: 20
    },
    cell: {
        height: 160,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    blue: {
        backgroundColor: 'royalblue'
    },
    blue2: {
        backgroundColor: 'skyblue'
    },
    blue3: {
        backgroundColor: 'steelblue'
    },
    title: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

export default MainMenuScreen;
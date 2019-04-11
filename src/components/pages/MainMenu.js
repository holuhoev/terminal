import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class MainMenu extends Component {

    render() {

        return (
            <View style={ styles.container }>
                <View style={ [styles.cell, styles.blue] }>
                    <Text style={ styles.title }>Сотрудники и Преподаватели</Text>
                </View>
                <View style={ [styles.cell, styles.blue2] }>
                    <Text style={ styles.title }>Новости</Text>
                </View>
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
        height: 150,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
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
        fontWeight:'bold',
        textAlign: 'center'
    }

});

export default MainMenu;
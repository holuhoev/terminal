import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableNativeFeedback, ActivityIndicator, ImageBackground } from 'react-native';

import { ROUTES } from "../../routes";
import { loadChairs } from "../../store/reducers/chairs";
import bg1 from '../../images/bg_1.jpg'
import { MainScreenHeader } from "../common/MainScreenHeader";

const title = 'Факультет компьютерных наук';

class MainMenuScreen extends Component {

    static navigationOptions = () => {

        return {
            title: 'Информационный терминал'
        };
    };

    componentDidMount() {
        this.props.loadChairs();
    }

    render() {
        if (this.props.loading) {
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
            )
        }

        return (
            <View style={ {
                flex: 1,
            } }>
                <MainScreenHeader
                    title={ title }
                    imageSrc={ bg1 }
                />
                <View style={ styles.container }>
                    <TouchableNativeFeedback
                        onPress={ () => this.props.navigation.navigate(ROUTES.PersonList) }
                    >
                        <View style={ [styles.cell, styles.blue] }>
                            <Text style={ styles.title }>Преподаватели и сотрудники</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={ () => this.props.navigation.navigate(ROUTES.NewsList) }
                    >
                        <View style={ [styles.cell, styles.blue2] }>
                            <Text style={ styles.title }>Новости</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:            1,
        backgroundColor: '#F5FCFF',
        flexWrap:        'wrap',
        flexDirection:   'row',
        justifyContent:  'space-around',
        alignItems:      'flex-start',
        paddingVertical: 20
    },
    cell:      {
        height:         160,
        width:          160,
        alignItems:     'center',
        justifyContent: 'center',
        borderRadius:   10
    },
    blue:      {
        backgroundColor: 'royalblue'
    },
    blue2:     {
        backgroundColor: 'skyblue'
    },
    blue3:     {
        backgroundColor: 'steelblue'
    },
    title:     {
        color:      '#FFF',
        fontSize:   18,
        fontWeight: 'bold',
        textAlign:  'center'
    }

});

const mapStateToProps    = state => {

    return {
        loading: state.chairs.loading
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    loadChairs
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuScreen);
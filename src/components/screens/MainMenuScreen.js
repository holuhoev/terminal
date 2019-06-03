import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { bindActionCreators } from "redux";
import { Button } from "react-native-elements";
import { ImageBackground } from "react-native";

import { ROUTES } from "../../utils/navigation";
import bg1 from '../../images/bg_1.jpg'
import bg2 from '../../images/bg_2.jpg'
import { MainScreenHeader } from "../common/MainScreenHeader";
import AnnouncementRunnableLine from "../common/AnnouncementRunnableLine";
import { selectMainScreenIsLoading } from "../../store/selectors/mainScreen";
import { loadChairs } from "../../store/reducers/chairs";
import logo from "../../images/logo.png";
import { loadDevice } from "../../store/reducers/device";


// const title = 'Мясницкая, 20';

class MainMenuScreen extends Component {

    static navigationOptions = () => {

        return {
            title:       '',
            headerStyle: {
                height: 0
            }
        };
    };

    componentDidMount() {
        this.props.loadDevice('3');
        // this.props.loadChairs();
    }

    renderLogo() {

        return (
            <View style={ { flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' } }>
                <Image source={ logo } resizeMode={ 'contain' } style={ { height: 200 } }/>
                <ActivityIndicator style={ { paddingTop: 20 } } size="large" color="#0000ff"/>
            </View>
        )
    }

    render() {
        const { loading, title } = this.props;

        if (loading) {
            return this.renderLogo()
        }

        return (
            <ImageBackground imageStyle={ {
                height:  '93%',
                flex:    1,
                opacity: 0.8
            } }
                             source={ bg2 }
                             style={ {
                                 flex: 1,
                             } }>
                <Text style={ {
                    color:           '#FFF',
                    backgroundColor: 'rgba(52,52,52,0.2)',
                    fontSize:        28,
                    fontWeight:      'bold',
                    textAlign:       'center',
                    paddingTop:      60
                } }>
                    { title }
                </Text>
                {/*<MainScreenHeader*/ }
                {/*    title={ title }*/ }
                {/*    imageSrc={ bg2 }*/ }
                {/*/>*/ }
                <View style={ styles.container }>
                    <Button
                        icon={ {
                            name:  "people",
                            size:  40,
                            color: "white"
                        } }
                        onPress={ () => this.props.navigation.navigate(ROUTES.PersonList) }
                        buttonStyle={ [styles.cell] }
                        title={ 'Сотрудники' }
                        titleStyle={ styles.buttonTitle }

                    />
                    <Button
                        icon={
                            <Icon
                                name={ "event-note" }
                                color={ 'white' }
                                size={ 40 }
                            />
                        }
                        onPress={ () => this.props.navigation.navigate(ROUTES.NewsList) }
                        buttonStyle={ [styles.cell] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Новости' }
                    />
                    <Button
                        onPress={ () => this.props.navigation.navigate(ROUTES.Events) }
                        buttonStyle={ [styles.cell] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Сегодня, 19 мая' }
                    />
                    <Button
                        onPress={ () => this.props.navigation.navigate(ROUTES.UnitList) }
                        buttonStyle={ [styles.cell] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Подразделения НИУ ВШЭ' }
                    />
                    <Button
                        onPress={ () => this.props.navigation.navigate(ROUTES.ServiceList) }
                        buttonStyle={ [styles.cell] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Услуги' }
                    />
                    <Button
                        onPress={ () => this.props.navigation.navigate(ROUTES.BuildingMap) }
                        buttonStyle={ [styles.cell] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Мое местоположение' }
                    />
                </View>
                {/*<AnnouncementRunnableLine/>*/}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:   {
        flex:            1,
        backgroundColor: 'rgba(52,52,52,0.2)',
        flexWrap:        'wrap',
        flexDirection:   'row',
        justifyContent:  'space-around',
        alignItems:      'flex-start',
        paddingBottom:   30,
        paddingTop:      80,
    },
    cell:        {
        height:          160,
        width:           160,
        borderRadius:    15,
        backgroundColor: 'rgba(21,67,238,0.83)',
        marginBottom:    20
    },
    buttonTitle: {
        fontSize: 18,
        color:    '#FFF'
    },
    blue:        {
        backgroundColor: 'rgba(65,105,225,0.9)'
    },
    blue2:       {
        backgroundColor: 'skyblue'
    },
    blue3:       {
        backgroundColor: '#04BAEE'
    },
    darkGrey:    {
        backgroundColor: '#8E8E93'
    },
    title:       {
        color:      '#FFF',
        fontSize:   18,
        fontWeight: 'bold',
        textAlign:  'center'
    }

});


const mapStateToProps = state => {

    return {
        loading: selectMainScreenIsLoading(state),
        title:   state.device.data.title
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadChairs,
    loadDevice
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuScreen);
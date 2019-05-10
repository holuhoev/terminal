import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ROUTES } from "../../utils/navigation";
import bg1 from '../../images/bg_1.jpg'
import { MainScreenHeader } from "../common/MainScreenHeader";
import { Button } from "react-native-elements";
import AnnouncementRunnableLine from "../common/AnnouncementRunnableLine";
import { selectMainScreenIsLoading } from "../../store/selectors/mainScreen";
import { bindActionCreators } from "redux";
import { loadChairs } from "../../store/reducers/chairs";
import { loadAnnouncements } from "../../store/reducers/announcements";
import { connect } from "react-redux";
import logo from "../../images/logo.png";
import { loadDevice } from "../../store/reducers/device";


const title = 'Факультет компьютерных наук';

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
        this.props.loadDevice();
        // this.props.loadAnnouncements();
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
        const { loading } = this.props;

        if (loading) {
            return this.renderLogo()
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
                    <Button
                        icon={ {
                            name:  "people",
                            size:  40,
                            color: "white"
                        } }
                        onPress={ () => this.props.navigation.navigate(ROUTES.PersonList) }
                        buttonStyle={ [styles.cell, styles.blue] }
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
                        buttonStyle={ [styles.cell, styles.blue2] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Новости' }
                    />
                    <Button
                        onPress={ () => this.props.navigation.navigate(ROUTES.Events) }
                        buttonStyle={ [styles.cell, styles.blue3] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Сегодня, 26 апреля' }
                    />
                    <Button
                        onPress={ () => this.props.navigation.navigate(ROUTES.BuildingMap) }
                        buttonStyle={ [styles.cell, styles.darkGrey] }
                        type='outline'
                        titleStyle={ styles.buttonTitle }
                        title={ 'Мое местоположение' }
                    />
                </View>
                {/*<AnnouncementRunnableLine/>*/ }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:   {
        flex:            1,
        backgroundColor: '#F5FCFF',
        flexWrap:        'wrap',
        flexDirection:   'row',
        justifyContent:  'space-around',
        alignItems:      'flex-start',
        paddingVertical: 20
    },
    cell:        {
        height:       160,
        width:        160,
        borderRadius: 10,
        marginBottom: 20
    },
    buttonTitle: {
        fontSize: 18,
        color:    '#FFF'
    },
    blue:        {
        backgroundColor: 'royalblue'
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
        loading: selectMainScreenIsLoading(state)
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadChairs,
    loadAnnouncements,
    loadDevice
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuScreen);
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ROUTES } from "../../routes";
import { loadChairs } from "../../store/reducers/chairs";
import bg1 from '../../images/bg_1.jpg'
import { MainScreenHeader } from "../common/MainScreenHeader";
import { Button } from "react-native-elements";
import AnnouncementRunnableLine from "../common/AnnouncementRunnableLine";
import { selectMainScreenIsLoading } from "../../store/selectors/mainScreen";

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
        const { loading } = this.props;
        // if (this.props.loading) {
        //     return (
        //         <View
        //             style={ {
        //                 paddingVertical: 20,
        //                 borderTopWidth:  1,
        //                 borderColor:     "#CED0CE"
        //             } }
        //         >
        //
        //         </View>
        //     )
        // }

        return (
            <View style={ {
                flex: 1,
            } }>
                { loading && <ActivityIndicator animating size="large"/> }
                <MainScreenHeader
                    title={ title }
                    imageSrc={ bg1 }
                />
                <View style={ styles.container }>
                    <Button
                        disabled={ loading }
                        icon={ {
                            name:  "people",
                            size:  40,
                            color: "white"
                        } }
                        onPress={ () => this.props.navigation.navigate(ROUTES.PersonList) }
                        buttonStyle={ [styles.cell, styles.blue] }
                        title={ 'Сотрудники' }
                        titleStyle={styles.buttonTitle}

                    />
                    <Button
                        disabled={ loading }
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
                        titleStyle={styles.buttonTitle}
                        title={ 'Новости' }
                    />
                    <Button
                        disabled={ loading }
                        onPress={ () => this.props.navigation.navigate(ROUTES.Events) }
                        buttonStyle={ [styles.cell, styles.blue3] }
                        type='outline'
                        titleStyle={styles.buttonTitle}
                        title={ 'Сегодня, 26 апреля' }
                    />
                </View>
                <AnnouncementRunnableLine/>
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
        marginBottom: 10
    },
    buttonTitle: {
        fontSize: 18,
        color: '#FFF'
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
    loadChairs
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuScreen);
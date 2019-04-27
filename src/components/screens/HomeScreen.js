import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, ActivityIndicator, Image } from 'react-native';


import { loadChairs } from "../../store/reducers/chairs";
import { selectMainScreenIsLoading } from "../../store/selectors/mainScreen";
import MainMenuScreen from "./MainMenuScreen";
import { loadAnnouncements } from "../../store/reducers/announcements";
import logo from '../../images/logo.png'


class HomeScreen extends Component {

    static navigationOptions = () => {

        return {
            title:       '',
            headerStyle: {
                height: 0
            }
        };
    };

    componentDidMount() {
        this.props.loadAnnouncements();
        this.props.loadChairs();
    }

    renderLogo() {

        return (
            <View style={ { flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center' } }>
                <Image source={ logo } resizeMode={ 'contain' } style={ { height: 200 } }/>
                {/*<ActivityIndicator animating size="large"/>*/}
            </View>
        )
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return this.renderLogo()
        }

        return (<MainMenuScreen/>);
    }
}

const mapStateToProps = state => {

    return {
        loading: selectMainScreenIsLoading(state)
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadChairs,
    loadAnnouncements
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
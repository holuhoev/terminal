import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, ActivityIndicator } from 'react-native';


import { loadChairs } from "../../store/reducers/chairs";
import { selectMainScreenIsLoading } from "../../store/selectors/mainScreen";
import MainMenuScreen from "./MainMenuScreen";
import { loadAnnouncements } from "../../store/reducers/announcements";


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
            <View style={ { flex: 1, backgroundColor: '#04BAEE' } }>
                <ActivityIndicator animating size="large"/>
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
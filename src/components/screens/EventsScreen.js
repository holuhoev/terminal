import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from "redux";
import { WebView } from 'react-native-webview';

import { loadEvents } from "../../store/reducers/events";
import EventListItem from "../common/EventListItem";
import HomeIcon from "../common/HomeIcon";


class EventsScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            url:             '',
            isWebViewOpened: false
        }
    }

    static navigationOptions = ({navigation}) => {

        return {
            title: 'Мероприятия сегодня',
            headerRight: (<HomeIcon onPress={ () => navigation.popToTop() }/>)
        };
    };

    componentDidMount() {
        this.props.loadEvents();
    }

    onOpenUrl = (url) => {
        this.setState({ isWebViewOpened: true, url: url });
    };

    renderEvents = () => {
        const { events } = this.props;

        return events.map((event, index) => {

            return (
                <EventListItem
                    openUrl={ this.onOpenUrl }
                    key={ index.toString() }
                    { ...event }
                />
            )
        })
    };

    render() {

        if (this.state.isWebViewOpened) {

            return (
                <WebView
                    source={ { uri: this.state.url } }
                />
            )
        }

        return (
            <View>
                <ScrollView>
                    { this.renderEvents() }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        events:  state.events.data,
        loading: state.events.loading,
        error:   state.events.error
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEvents
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from "redux";

import { loadEvents } from "../../store/reducers/events";
import EventListItem from "../common/EventListItem";
import { Text } from "react-native-elements";


class EventsScreen extends React.Component {

    static navigationOptions = () => {

        return {
            title: 'Мероприятия сегодня'
        };
    };

    componentDidMount() {
        this.props.loadEvents();
    }

    renderEvents = () => {
        const { events } = this.props;

        return events.map((event, index) => {

            return (
                <EventListItem
                    key={ index.toString() }
                    { ...event }
                />
            )
        })
    };

    render() {

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
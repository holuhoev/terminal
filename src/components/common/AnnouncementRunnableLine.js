import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import TextTicker from 'react-native-text-ticker'
import { bindActionCreators } from "redux";
import { isEmpty } from 'ramda'


class AnnouncementRunnableLine extends Component {

    render() {
        const { announcements } = this.props;

        if (isEmpty(announcements)) {
            return null;
        }

        return (
            <View style={ styles.container }>
                <TextTicker
                    style={ { fontSize: 24 } }
                    duration={ 12000 }
                    loop
                    bounce
                    // scroll
                    repeatSpacer={ 50 }
                    marqueeDelay={ 8000 }
                >
                    { announcements.map(item => item.content + "\t\t") }
                </TextTicker>
            </View>
        );
    }
}

const mapStateToProps = state => {

    return {
        announcements: state.announcements.data
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


const styles = StyleSheet.create({
    container: {
        height:         70,
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementRunnableLine)
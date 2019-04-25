import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TextTicker from 'react-native-text-ticker'


export default class AnnouncementRunnableLine extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <TextTicker
                    style={ { fontSize: 24 } }
                    duration={ 8000 }
                    loop
                    bounce
                    // scroll
                    repeatSpacer={ 20 }
                    marqueeDelay={ 8000 }
                >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.
                </TextTicker>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:         70,
        justifyContent: 'center',
    },
});
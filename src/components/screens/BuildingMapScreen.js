import React from 'react';
import { View } from 'react-native';
import { Button } from "react-native-elements";
import PinchZoomView from 'react-native-pinch-zoom-view';

import BuildingMap from "../common/BuildingMap";


const auditoriums = [
    {
        id:     1,
        points: '10,10 10,60 100,60, 100,10',
        number: '402',
        textX:  '55',
        textY:  '35'
    }
];

class BuildingMapScreen extends React.Component {

    state = {
        scale: 1
    };

    static navigationOptions = () => {

        return {
            title: 'Схема здания'
        };
    };

    plusScale = () => {
        const current = this.state.scale;

        this.setState({ scale: current + 0.5 });
    };

    minusScale = () => {
        const current = this.state.scale;

        this.setState({ scale: current - 0.5 });
    };

    render() {

        const { scale } = this.state;

        return (
            <View
                style={ {
                    flex: 1,
                } }
            >
                <Button
                    title={ "+" }
                    onPress={ this.plusScale }
                />
                <Button
                    title={ "-" }
                    onPress={ this.minusScale }
                />

                <PinchZoomView>
                    <View style={ {
                        flex: 1
                    } }>
                        <BuildingMap
                            scale={ scale }
                            auditoriums={ auditoriums }
                        />
                    </View>
                </PinchZoomView>
            </View>

        )
    }
}

export default BuildingMapScreen;
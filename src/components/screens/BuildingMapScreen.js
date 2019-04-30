import React from 'react';
import { View } from 'react-native';

import BuildingMap from "../common/BuildingMap";
import { Button } from "react-native-elements";


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
        scale: 0
    };

    static navigationOptions = () => {

        return {
            title: 'Схема здания'
        };
    };

    plusScale = () => {
        const current = this.state.scale;

        this.setState({ scale: current + 10 });
    };

    render() {
        console.log("scale: " + this.state.scale);

        return (
            <View
                style={ {
                    flex:           1,
                    alignItems:     'center',
                    justifyContent: 'center'
                } }
            >
                <Button
                    title={ "+" }
                    onPress={ this.plusScale }
                />
                <BuildingMap
                    scale={ this.state.scale }
                    auditoriums={ auditoriums }
                />
            </View>
        )
    }
}

export default BuildingMapScreen;
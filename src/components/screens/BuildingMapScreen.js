import React from 'react';
import { View } from 'react-native';

import BuildingMap from "../common/BuildingMap";


const auditoriums = [
    {
        id:     1,
        points: '10,10 10,60 100,60, 100,10',
        number: '402',
        textX:  '10',
        textY:  '40'
    }
];

class BuildingMapScreen extends React.Component {

    static navigationOptions = () => {

        return {
            title: 'Схема здания'
        };
    };

    render() {
        return (
            <View
                style={ {
                    flex:           1,
                    alignItems:     'center',
                    justifyContent: 'center'
                } }
            >
                <BuildingMap
                    auditoriums={ auditoriums }
                />
            </View>
        )
    }
}

export default BuildingMapScreen;
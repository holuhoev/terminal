import { ImageBackground, Text } from "react-native";
import React from "react";

export function MainScreenHeader({ title, imageSrc }) {

    return (
        <ImageBackground source={ imageSrc } style={ {
            height:         200,
            width:          '100%',
            justifyContent: 'center',
            alignItems:     'center'
        } }>
            <Text style={ {
                color:      '#FFF',
                fontSize:   24,
                fontWeight: 'bold',
                textAlign:  'center'
            } }>
                { title }
            </Text>
        </ImageBackground>
    )
}
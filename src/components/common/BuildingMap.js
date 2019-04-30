import React, { Fragment } from 'react'
import Svg, { Polygon, Text } from "react-native-svg";

function Room(item) {

    return (
        <Fragment>
            <Polygon
                points={ item.points }
                fill="#8E8E93"
                opacity={ 0.5 }
                scale={ item.scale }
            />
            <Text
                x={ item.textX }
                y={ item.textY }
                fontSize="16"
                scale={ item.scale }
                textAnchor={ "middle" }
            >
                { item.number }
            </Text>
        </Fragment>
    )
}

class BuildingMap extends React.Component {

    render() {
        const { auditoriums, scale } = this.props;

        return (


            <Svg
                height="100%"
                width="100%"
                scale={ `0.2` }
                // viewBox={ `0 0 ${ 100 * scale } ${ 100 * scale }` }
            >

                {
                    auditoriums.map((item, i) => (
                        <Room
                            { ...item }
                            scale={ scale }
                            key={ i.toString() }
                        />
                    ))
                }
            </Svg>
        )
    }
}

export default BuildingMap;
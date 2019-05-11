import React, { Fragment } from 'react'
import Svg, { Polygon, Polyline, Text } from "react-native-svg";


function Room(item) {

    return (
        <Fragment>
            <Polygon
                points={ item.coordinates }
                fill="#D8D8D8"
                stroke="#979797"
                strokeWidth={ 1 }
                opacity={ 0.5 }
            />
            { item.textCentroid && (
                <Text
                    fill="white"
                    fontWeight="bold"
                    x={ item.textCentroid[0] }
                    y={ item.textCentroid[1] }
                    fontSize="16"
                    textAnchor={ "middle" }
                >
                    { item.number }
                </Text>
            ) }
        </Fragment>
    )
}

class BuildingMap extends React.Component {

    render() {
        const { rooms, route } = this.props;

        return (


            <Svg
                height="100%"
                width="100%"
            >
                {
                    rooms.map((item, i) => (
                        <Room
                            { ...item }
                            key={ i.toString() }
                        />
                    ))
                }
                { route && (
                    <Polyline
                        points={ route }
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                    />
                ) }
            </Svg>
        )
    }
}

export default BuildingMap;
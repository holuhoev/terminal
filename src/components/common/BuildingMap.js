import React, { Fragment } from 'react'
import Svg, { Polygon, Text } from "react-native-svg";

function Room(item) {

    return (
        <Fragment>
            <Polygon
                points={ item.points }
                fill="#D8D8D8"
                stroke="#979797"
                strokeWidth={ 1 }
                opacity={ 0.5 }
            />
            { item.number && (
                <Text
                    fill="white"
                    fontWeight="bold"
                    x={ item.textX }
                    y={ item.textY }
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
        console.log(route);

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
            </Svg>
        )
    }
}

export default BuildingMap;
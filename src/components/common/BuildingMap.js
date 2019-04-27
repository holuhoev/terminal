import React, { Fragment } from 'react'
import Svg, { Polygon, Text as SvgText } from "react-native-svg";
import { Text } from "react-native-elements";


function Room(item) {

    return (
        <Fragment>
            <Polygon
                points={ item.points }
                fill="#8E8E93"
                opacity={ 0.5 }
            />
            <SvgText
                x={ item.textX }
                y={ item.textY }
                textLength={ '90' }
                // fill="none"
                // stroke="purple"
                fontSize="16"
                // fontWeight="bold"
                // textAnchor="middle"
            >
                { item.number }
            </SvgText>
        </Fragment>
    )
}

class BuildingMap extends React.Component {

    render() {
        const { auditoriums } = this.props;

        return (

            <Svg
                height="50%"
                width="100%"
            >

                {
                    auditoriums.map((item, i) => (
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
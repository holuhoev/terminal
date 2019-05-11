import React, { Fragment } from 'react'
import Svg, { Polygon, Polyline, Text } from "react-native-svg";
import { MAP_ELEMENTS_TYPES } from "../../store/reducers/map";

const isElementHasLabel = element => {

    return element.type === MAP_ELEMENTS_TYPES.ROOM
        && !!element.textCentroid
        && !!element.label;
};

function Element(item) {

    return (
        <Fragment>
            <Polygon
                points={ item.coordinates }
                fill="#D8D8D8"
                stroke="#979797"
                strokeWidth={ 1 }
                opacity={ 0.5 }
            />
            { isElementHasLabel(item) && (
                <Text
                    fill="white"
                    fontWeight="bold"
                    x={ item.textCentroid[0] }
                    y={ item.textCentroid[1] }
                    fontSize="16"
                    textAnchor={ "middle" }
                >
                    { item.label }
                </Text>
            ) }
        </Fragment>
    )
}

class BuildingMap extends React.Component {

    render() {
        const { elements, route } = this.props;

        return (


            <Svg
                height="100%"
                width="100%"
            >
                {
                    elements.map((item, i) => (
                        <Element
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
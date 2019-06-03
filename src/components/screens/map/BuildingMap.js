import React, { Fragment } from 'react'
import PinchZoomView from "react-native-pinch-zoom-view";
import Svg, { Circle, ClipPath, G, Line, Polygon, Polyline, Text } from "react-native-svg";

import { isElementIsStair, MAP_ELEMENTS_TYPES } from "../../../store/reducers/map";
import ServiceIcon from "./ServiceIcon";
import Position from "./Position";


const isElementHasLabel = element => {

    return element.type === MAP_ELEMENTS_TYPES.ROOM
        && !!element.textCentroid
        && !!element.label;
};

const renderStairs = element => {
    const { lines } = element;

    if (!lines)
        return null;

    return (
        <Fragment>
            <ClipPath id={ `stairsPath_${ element.id }` }>
                <Polygon points={ element.coordinates }/>
            </ClipPath>
            <G clipPath={ `url(#stairsPath_${ element.id })` }>
                {
                    lines.map((line, i) => (
                        <Line
                            key={ i }
                            x1={ line.x1 }
                            y1={ line.y1 }
                            x2={ line.x2 }
                            y2={ line.y2 }
                            stroke={ "#236481" }
                        />
                    ))
                }
            </G>
        </Fragment>

    )
};

function Element(item) {

    return (
        <Fragment>
            <Polygon
                points={ item.coordinates }
                fill={ item.isActive ? "rgba(35,100,129,0.73)" : "#FFF" }
                stroke={ "#236481" }
                strokeWidth={ 1 }
            />
            { isElementHasLabel(item) && (
                <Text
                    fill={ item.isActive ? "#FFF" : "#507b8f" }
                    x={ item.textCentroid[0] }
                    y={ item.textCentroid[1] }
                    fontSize="8"
                    textAnchor={ "middle" }
                >
                    { item.label }
                </Text>
            ) }
            { isElementIsStair(item) && (
                renderStairs(item)
            ) }
        </Fragment>
    )
}

class BuildingMap extends React.Component {

    render() {
        const { elements, route, stairsPoint, servicePoints, positionPoint } = this.props;

        return (

            <PinchZoomView
                maxScale={ 10 }
            >
                <Svg
                    height='100%'
                    width='100%'
                >
                    {
                        elements.map((item, i) => (
                            <Element
                                { ...item }
                                key={ i.toString() }
                            />
                        ))
                    }
                    {
                        servicePoints.map((point, i) => (
                            <ServiceIcon
                                { ...point }
                                key={ i }
                            />
                        ))
                    }
                    { route && (
                        <Polyline
                            points={ route }
                            fill="none"
                            stroke={ "#26c2ed" }
                            strokeWidth="2"
                            strokeLinecap={ "round" }
                        />
                    ) }
                    { stairsPoint && (
                        <Circle
                            cx={ stairsPoint.x }
                            cy={ stairsPoint.y }
                            r="4"
                            stroke={ "#274fed" }
                            fill={ "none" }
                            strokeWidth={ "2" }
                        />
                    ) }
                    { positionPoint && (
                        <Position
                            { ...positionPoint }
                        />
                    ) }
                </Svg>
            </PinchZoomView>
        )
    }
}

export default BuildingMap;
import React, { Fragment } from 'react'
import PinchZoomView from "react-native-pinch-zoom-view";
import Svg, { ClipPath, G, Line, Polygon, Polyline, Rect, Text } from "react-native-svg";

import { isElementIsStair, MAP_ELEMENTS_TYPES } from "../../store/reducers/map";


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
                fill={ "#FFF" }
                stroke={ "#236481" }
                strokeWidth={ 1 }
            />
            { isElementHasLabel(item) && (
                <Text
                    fill={ "#507b8f" }
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
        const { elements, route } = this.props;

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
                    { route && (
                        <Polyline
                            points={ route }
                            fill="none"
                            stroke={ "#26c2ed" }
                            strokeWidth="1.5"
                            strokeLinecap={ "round" }
                        />
                    ) }
                </Svg>
            </PinchZoomView>
        )
    }
}

export default BuildingMap;
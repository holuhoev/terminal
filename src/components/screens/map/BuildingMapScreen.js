import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { View } from 'react-native';

import BuildingMap from "./BuildingMap";
import {
    schemeServicesSelector,
    selectElements, selectPositionPoint,
    selectRoute,
    selectRouteStairsPoint
} from "../../../store/selectors/map";
import SchemeMenu from "../../common/SchemeMenu";
import HomeIcon from "../../common/HomeIcon";


class BuildingMapScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title:       navigation.getParam('title', 'Схема здания'),
            headerRight: (<HomeIcon onPress={ () => navigation.popToTop() }/>)
        };
    };

    render() {
        const { elements, route, stairsPoint, servicePoints, positionPoint } = this.props;

        return (
            <View style={ { flex: 1 } }>
                <SchemeMenu/>
                <BuildingMap
                    elements={ elements }
                    route={ route }
                    stairsPoint={ stairsPoint }
                    servicePoints={ servicePoints }
                    positionPoint={ positionPoint }
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const fromScreen = ownProps.navigation.getParam("from", "");
    const params     = ownProps.navigation.getParam("params", {});

    return {
        elements:      selectElements(state, fromScreen, params),
        route:         selectRoute(state, fromScreen, params),
        stairsPoint:   selectRouteStairsPoint(state, fromScreen, params),
        servicePoints: schemeServicesSelector(state),
        positionPoint: selectPositionPoint(state)
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMapScreen);
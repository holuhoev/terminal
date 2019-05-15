import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { View } from 'react-native';

import BuildingMap from "../common/BuildingMap";
import { selectElements, selectRouteFromDevice } from "../../store/selectors/map";
import SchemeMenu from "../common/SchemeMenu";


class BuildingMapScreen extends React.Component {


    static navigationOptions = () => {

        return {
            title: 'Схема здания'
        };
    };

    render() {
        const { elements, route } = this.props;
        return (
            <View style={ { flex: 1 } }>
                <SchemeMenu/>
                <BuildingMap
                    elements={ elements }
                    route={ route }
                />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const fromScreen = ownProps.navigation.getParam("from", "");
    const params     = ownProps.navigation.getParam("params", {});

    return {
        elements: selectElements(state),
        route:    selectRouteFromDevice(state, fromScreen, params)
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMapScreen);
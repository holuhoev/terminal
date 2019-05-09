import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { View } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';

import BuildingMap from "../common/BuildingMap";
import { selectRouteFromDeviceToDestinationPoint, selectRooms, selectRouteFromDevice } from "../../store/selectors/map";
import { BUILDING_ROUTE_TO } from "../../utils/navigation";


class BuildingMapScreen extends React.Component {


    static navigationOptions = () => {

        return {
            title: 'Схема здания'
        };
    };

    render() {
        const { rooms, route } = this.props;

        return (
            <PinchZoomView
                maxScale={ 10 }
            >
                <View style={ {
                    flex: 1
                } }>
                    <BuildingMap
                        rooms={ rooms }
                        route={ route }
                    />
                </View>
            </PinchZoomView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const fromScreen = ownProps.navigation.getParam("from", "");
    const params     = ownProps.navigation.getParam("params", {});

    return {
        rooms: selectRooms(state),
        route: selectRouteFromDevice(state, fromScreen, params)
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMapScreen);
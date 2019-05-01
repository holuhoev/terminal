import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { View } from 'react-native';
import PinchZoomView from 'react-native-pinch-zoom-view';

import BuildingMap from "../common/BuildingMap";
import { selectPath, selectRooms } from "../../store/selectors/map";


class BuildingMapScreen extends React.Component {


    static navigationOptions = () => {

        return {
            title: 'Схема здания'
        };
    };

    render() {
        const { rooms, path } = this.props;
        console.log(path);

        return (
            <PinchZoomView
                maxScale={ 10 }
            >
                <View style={ {
                    flex: 1
                } }>
                    <BuildingMap
                        rooms={ rooms }
                    />
                </View>
            </PinchZoomView>
        )
    }
}

const mapStateToProps = state => {

    return {
        rooms: selectRooms(state),
        path:  selectPath(state, '1', '5')
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BuildingMapScreen);
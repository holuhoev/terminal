import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    FlatList,
    ActivityIndicator
} from "react-native";
import { SearchBar } from "react-native-elements";
import { isNil, isEmpty } from "ramda";

import { changeUnitsSearchQuery, loadUnits } from "../../store/reducers/units";
import UnitListItem from "../common/UnitListItem";
import { selectUnitList } from "../../store/selectors/units";
import { ROUTES } from "../../utils/navigation";
import HomeIcon from "../common/HomeIcon";


class UnitListScreen extends Component {

    constructor(props) {
        super(props);

    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Поиск по подразделениям',
            headerRight: (<HomeIcon onPress={ () => navigation.popToTop() }/>)
        };
    };


    componentDidMount() {
        const { loadUnits, searchQuery } = this.props;
        loadUnits(searchQuery);

    }


    renderSeparator = () => {
        return (
            <View
                style={ {
                    height:          1,
                    width:           "90%",
                    backgroundColor: "#CED0CE",
                    marginLeft:      "5%",
                } }
            />
        );
    };

    renderHeader = () => {
        const { searchQuery } = this.props;

        return (
            <Fragment>
                <SearchBar
                    platform={ "android" }
                    placeholder="Введите текст..."
                    lightTheme
                    round
                    onChangeText={ text => this.props.changeUnitsSearchQuery(text) }
                    value={ searchQuery }
                />
                <View
                    style={ {
                        height:          1,
                        width:           "100%",
                        backgroundColor: "#CED0CE",
                        marginVertical:  3,
                    } }
                />
            </Fragment>

        );
    };

    renderFooter = () => {
        if (!this.props.loading) return null;

        return (
            <View
                style={ {
                    paddingVertical: 20,
                    borderTopWidth:  1,
                    borderColor:     "#CED0CE"
                } }
            >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };


    onRouteClick = (unitId, title) => {
        this.props.navigation.navigate(ROUTES.BuildingMap, {
            title,
            params: {
                unitId
            },
            from:   ROUTES.UnitList
        })
    };

    renderItem = ({ item }) => {

        return (
            <UnitListItem
                id={ item.id }
                title={ item.title }
                description={ item.description }
                getRoute={ this.onRouteClick }
            />
        )
    };

    loadUnits = () => {

    };


    get isDataEmpty() {
        const { data } = this.props;

        return isNil(data) || isEmpty(data);
    }

    render() {

        if (this.isDataEmpty) {

            return (
                <View>
                    <FlatList
                        ListHeaderComponent={ this.renderHeader() }
                        ListFooterComponent={ this.renderFooter }
                    />
                </View>
            )
        }

        return (
            <View>
                <FlatList
                    data={ this.props.data }
                    renderItem={ this.renderItem }
                    keyExtractor={ item => '' + item.id }
                    ItemSeparatorComponent={ this.renderSeparator }
                    ListHeaderComponent={ this.renderHeader() }
                    ListFooterComponent={ this.renderFooter }
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    loading:     state.units.loading,
    data:        selectUnitList(state),
    searchQuery: state.units.searchQuery,
    error:       state.units.error
});


const mapDispatchToProps = dispatch => bindActionCreators({
    changeUnitsSearchQuery: changeUnitsSearchQuery,
    loadUnits:              loadUnits,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UnitListScreen);
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

import { changeServicesSearchQuery, loadServices } from "../../store/reducers/services";
import ServiceListItem from "../common/ServiceListItem";
import { selectServiceList } from "../../store/selectors/services";
import { ROUTES } from "../../utils/navigation";


class ServiceListScreen extends Component {

    constructor(props) {
        super(props);

    }

    static navigationOptions = () => {
        return {
            title: 'Поиск по услугам'
        };
    };


    componentDidMount() {
        const { loadServices, searchQuery } = this.props;
        loadServices(searchQuery);

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
                    onChangeText={ text => this.props.changeServicesSearchQuery(text) }
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


    onRouteClick = (serviceId) => {
        // TODO: передавать pointId
        this.props.navigation.navigate(ROUTES.BuildingMap, {
            params: {
                serviceId
            },
            from:   ROUTES.ServiceList
        })
    };

    renderItem = ({ item }) => {

        return (
            <ServiceListItem
                { ...item }
                getRoute={ this.onRouteClick }
            />
        )
    };

    loadServices = () => {

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
    loading:     state.services.loading,
    data:        selectServiceList(state),
    searchQuery: state.services.searchQuery,
    error:       state.services.error
});


const mapDispatchToProps = dispatch => bindActionCreators({
    changeServicesSearchQuery,
    loadServices,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListScreen);
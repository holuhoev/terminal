import React from 'react'
import { connect } from 'react-redux';
import {
    View,
    FlatList,
    ActivityIndicator
} from "react-native";
import { bindActionCreators } from "redux";

import { loadNews } from "../../store/reducers/news";
import NewsCard from "../common/NewsCard";
import { selectNews } from "../../store/selectors/news";
import HomeIcon from "../common/HomeIcon";


class NewsListScreen extends React.Component {

    static navigationOptions = ({navigation}) => {

        return {
            title: 'Новости',
            headerRight: (<HomeIcon onPress={ () => navigation.popToTop() }/>)
        };
    };

    componentDidMount() {
        this.props.loadNews()
    }

    renderItem = ({ item }) => {


        return (<NewsCard{ ...item }/>)
    };

    render() {
        const { data } = this.props;

        return (
            <View>
                <FlatList
                    data={ data }
                    renderItem={ this.renderItem }
                    keyExtractor={ item => item.id.toString() }
                />
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        data: selectNews(state)
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadNews
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsListScreen);
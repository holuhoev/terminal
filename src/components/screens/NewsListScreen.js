import React from 'react'
import { connect } from 'react-redux';
import { View } from 'react-native'
import { bindActionCreators } from "redux";

import { loadNews } from "../../store/reducers/news";


class NewsListScreen extends React.Component {

    static navigationOptions = () => {

        return {
            title: 'Новости'
        };
    };

    componentDidMount() {
        this.props.loadNews()
    }

    render() {

        return (
            <View>
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        data: state.news.newsList
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    loadNews
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsListScreen);
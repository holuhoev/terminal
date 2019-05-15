import React from 'react'
import { connect } from 'react-redux';
import { ButtonGroup, Header } from "react-native-elements";
import {
    selectActiveSchemeIndex,
    selectSchemes
} from "../../store/selectors/map";
import { bindActionCreators } from "redux";
import { changeActiveSchemeIndex } from "../../store/reducers/map";


class SchemeMenu extends React.Component {

    onSchemeChange = (index) => {
        // TODO: dispatch action
        this.props.changeActiveSchemeIndex(index)
    };

    render() {
        const { schemes, activeIndex } = this.props;

        return (
            <Header
                containerStyle={ {
                    backgroundColor: 'transparent',
                    zIndex:          100
                } }
                centerComponent={ (
                    <ButtonGroup
                        onPress={ this.onSchemeChange }
                        selectedIndex={ activeIndex }
                        buttons={ schemes.map(scheme => `${ scheme.floor } Этаж`) }
                        buttonStyle={ {} }
                    />
                ) }
            />
        )
    }
}

const mapStateToProps = (state) => {

    return {
        schemes:     selectSchemes(state),
        activeIndex: selectActiveSchemeIndex(state)
    }
};


const mapDispatchToProps = dispatch => bindActionCreators({
    changeActiveSchemeIndex
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SchemeMenu);
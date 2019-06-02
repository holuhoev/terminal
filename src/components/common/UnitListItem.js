import React, { Fragment } from 'react'
import { Button, ListItem } from "react-native-elements";
import { Text, StyleSheet } from 'react-native';

export default class UnitListItem extends React.Component {
    render() {
        const { id, title, description, getRoute } = this.props;

        return (
            <ListItem
                title={
                    <Text style={ styles.fioText }>
                        { title }
                    </Text>
                }
                subtitle={ description }
                subtitleStyle={ { color: 'black' } }
                containerStyle={ { borderBottomWidth: 0 } }
                rightElement={ (
                    <Button
                        title={ "Местоположение" }
                        type={ 'outline' }
                        onPress={ () => getRoute(id,title) }
                    />
                ) }
            />
        )
    }
}

const styles = StyleSheet.create({
    fioText: {
        fontWeight: 'bold',
        color:      'black'
    }
});
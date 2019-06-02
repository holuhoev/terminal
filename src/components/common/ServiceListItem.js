import React, { Fragment } from 'react'
import { Button, ListItem } from "react-native-elements";
import { Text, StyleSheet, View } from 'react-native';

export default class ServiceListItem extends React.Component {
    render() {
        const { id, title, typeLabel, floor, getRoute } = this.props;

        return (
            <ListItem
                title={
                    <Text style={ styles.fioText }>
                        { title }
                    </Text>
                }
                subtitle={ `${ typeLabel } ${ floor ? floor + ' этаж' : '' }` }
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
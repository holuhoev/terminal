import React, { Fragment } from 'react'
import { Button, ListItem } from "react-native-elements";
import { Text, StyleSheet, View } from 'react-native';

export default class UnitListItem extends React.Component{
    render() {
        const { id, title, description, getRoute } = this.props;

        return (
            <ListItem
                title={
                    <Text style={ styles.fioText }>
                        { title }
                    </Text>
                }
                subtitle={ description}
                containerStyle={ { borderBottomWidth: 0 } }
                rightElement={ (
                    <Button
                        title={ "Местоположение" }
                        type={ 'outline' }
                        onPress={ () => getRoute(id) }
                    />
                ) }
            />
        )
    }
}

const styles = StyleSheet.create({
    fioText: {
        fontWeight: 'bold'
    }
});
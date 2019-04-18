import React from 'react'
import { ListItem } from "react-native-elements";
import { Text, StyleSheet } from 'react-native';

class PersonListItem extends React.PureComponent {

    render() {
        const { fio, email, avatarUrl } = this.props;

        return (
            <ListItem
                roundAvatar
                title={
                    <Text style={ styles.fioText }>
                        { fio }
                    </Text>
                }
                subtitle={ email }
                leftAvatar={ { source: { uri: avatarUrl } } }
                containerStyle={ { borderBottomWidth: 0 } }
                chevron
            />
        )
    }
}


const styles = StyleSheet.create({
    fioText: {
        fontWeight: 'bold'
    }
});

export default PersonListItem;
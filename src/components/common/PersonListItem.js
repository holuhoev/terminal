import React, { Fragment } from 'react'
import { ListItem } from "react-native-elements";
import { Text, StyleSheet, View } from 'react-native';


class PersonListItem extends React.PureComponent {

    render() {
        const { fio, avatarUrl, faculties } = this.props;

        return (
            <ListItem
                roundAvatar
                title={
                    <Text style={ styles.fioText }>
                        { fio }
                    </Text>
                }
                subtitle={ (
                    <View>
                        {
                            faculties.map((item, index) => (
                                <Fragment key={ index.toString() }>
                                    <Text>
                                        { item.position }
                                    </Text>
                                    <Text>
                                        { item.chair }
                                    </Text>
                                </Fragment>
                            ))
                        }
                    </View>
                ) }
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
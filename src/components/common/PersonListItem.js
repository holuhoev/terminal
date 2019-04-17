import React from 'react'
import { ListItem } from "react-native-elements";

class PersonListItem extends React.PureComponent {

    render() {
        const { firstName, lastName, email, avatarUrl } = this.props;

        return (
            <ListItem
                roundAvatar
                title={ `${ firstName } ${ lastName }` }
                subtitle={ email }
                leftAvatar={ { source: { uri: avatarUrl } } }
                containerStyle={ { borderBottomWidth: 0 } }
            />
        )
    }
}

export default PersonListItem;
import React from 'react'
import { Button } from "react-native-elements";


function HomeIcon({ onPress }) {

    return (
        <Button
            containerStyle={ { marginRight: 10 } }
            onPress={ onPress }
            type="clear"
            icon={ {
                name:  "home",
                size:  28,
                color: "#537eff"
            } }
        />
    )
}

export default HomeIcon
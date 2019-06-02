import React from 'react'
import { View } from 'react-native';
import { Button, Card, Text } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';


class EventListItem extends React.PureComponent {

    render() {
        const { title, addInfo, tags, topics, url, time, openUrl } = this.props;

        return (
            <Card>
                <View
                    style={ {
                        flex:           1,
                        flexDirection:  'row',
                        justifyContent: 'flex-end'
                    } }
                >
                    <Text>
                        { addInfo }
                    </Text>
                </View>
                <Text
                    style={ {
                        paddingBottom: 5,
                        color:         'black'
                    } }
                    h4
                    onPress={ () => openUrl(url) }
                >
                    { title }
                </Text>
                <View
                    style={ {
                        flex:          1,
                        flexWrap:      'wrap',
                        flexDirection: 'row',
                        alignItems:    'flex-start',
                    } }
                >
                    {
                        topics.map((topic, i) => (
                            <Button
                                key={ i.toString() }
                                containerStyle={ {
                                    paddingRight: 10,
                                    marginBottom: 5
                                } }
                                buttonStyle={ {
                                    backgroundColor: topic.color
                                } }
                                title={ topic.title }
                            />
                        ))
                    }

                    {
                        tags.map((tag, index) => (
                            <Button
                                containerStyle={ {
                                    paddingRight: 10,
                                    marginBottom: 5
                                } }
                                key={ index.toString() }
                                type="outline"
                                title={ tag }
                            />
                        ))
                    }
                </View>
                <View
                    style={ {
                        paddingTop:     10,
                        flex:           1,
                        flexDirection:  'row',
                        justifyContent: 'space-between'
                    } }
                >
                    <Text>
                        { `${ time } ` }
                    </Text>
                </View>
            </Card>
        )
    }
}

export default EventListItem;
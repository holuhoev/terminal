import React from 'react'
import { View } from 'react-native';
import { Button, Card, Text } from "react-native-elements";


class EventListItem extends React.PureComponent {

    render() {
        const { title, addInfo, tags, topics, url, time } = this.props;

        return (
            <Card
                title={ title }
            >
                <View
                    style={ {
                        flex:           1,
                        flexDirection:  'row',
                        justifyContent: 'flex-end'
                    } }
                >
                    <Text>
                        { `${ time } ` }
                    </Text>
                    <Text>
                        { addInfo }
                    </Text>
                </View>
                <Text
                    style={ {
                        paddingBottom: 10,
                        fontSize:      16
                    } }
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
            </Card>
        )
    }
}

export default EventListItem;
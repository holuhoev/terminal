import React from 'react'
import { ActivityIndicator, View } from 'react-native';
import { Button, Card, Image, Text } from "react-native-elements";


class NewsCard extends React.PureComponent {

    render() {
        const { title, content, tags, topic, imageUrl, date } = this.props;

        return (
            <Card
                titleStyle={{color:'black'}}
                title={ title }
            >
                <Image
                    source={ { uri: imageUrl } }
                    style={ { width: 540, height: 480 } }
                    PlaceholderContent={ <ActivityIndicator/> }
                />
                <View
                    style={ {
                        flex:           1,
                        flexDirection:  'row',
                        justifyContent: 'flex-end'
                    } }
                >
                    <Text>
                        { date }
                    </Text>
                </View>
                <Text
                    style={ {
                        paddingBottom: 10,
                        fontSize:      16,
                        color:'black'
                    } }
                >
                    { content }
                </Text>

                <View
                    style={ {
                        flex:          1,
                        flexWrap:      'wrap',
                        flexDirection: 'row',
                        alignItems:    'flex-start',
                    } }
                >
                    <Button
                        key={ "topic" }
                        containerStyle={ {
                            paddingRight: 10,
                            marginBottom: 5
                        } }
                        buttonStyle={ {
                            backgroundColor: topic.color
                        } }
                        title={ topic.title }
                    />
                    {
                        tags.map(tag => (
                            <Button
                                containerStyle={ {
                                    paddingRight: 10,
                                    marginBottom: 5
                                } }
                                key={ tag.id.toString() }
                                type="outline"
                                title={ tag.title }
                            />
                        ))
                    }
                </View>
            </Card>
        )
    }
}

export default NewsCard;
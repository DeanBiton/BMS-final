import React from 'react'
import { View, Text } from 'react-native'

function Event({route}) {
    const {event} = route.params
    return (
        <View>
            <Text>
                {event._id}
            </Text>
        </View>
    )
}

export default Event

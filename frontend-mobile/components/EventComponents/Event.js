import React from 'react'
import { View } from 'react-native'

function Event({event}) {
  return (
    <View>
        <Text>
            {event._id}
        </Text>
    </View>
  )
}

export default Event

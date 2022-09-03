import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { useSelector } from 'react-redux'

function HomeScreen({navigation}) {
  
  const { user } = useSelector((state) => state.auth)

  return (
    <View>
        <Text> Home Screen </Text>
    </View>
  )
}

export default HomeScreen
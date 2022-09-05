import React from 'react'
import { View, Pressable, StyleSheet, Text} from 'react-native'

function EventCard({event, navigation}) {
    const onPress = () => {
        navigation.navigate('eventScreen', {event})
    }
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{`Location: ${event.location} \n Date:${event.date}`}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFD700',
        justifyContent: "flex-start",
        width: '80%',
        padding: 15,
        marginLeft: '10%',
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
    },
  });

export default EventCard
// onPress={navigation.navigate('eventScreen', event={event})}
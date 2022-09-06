import React from 'react'
import { View, Pressable, StyleSheet, Text} from 'react-native'

function EventCard(props) {
    const event = props.event.item
    const navigation = props.navigation
    const onPress = () => {
        navigation.navigate('eventScreen', {event})
    }
  return (
    <View style={styles.container} elevation={5}>
    <Pressable style={styles.pressable} onPress={onPress}>
      <View style={styles.s}>
        <Text style={styles.text}>{`Location: ${event.location} \n Date: ${event.date}\n Hours: 10:00-12:00`}</Text>
      </View>
    </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    height: 80,
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  pressable: {
    flex: 1, 
    flexDirection: 'row',
  },
  s: {
    flex: 1,
    flexDirection: 'column',
    height: 70,
    width: '90%',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  text:{
    // flex: 1,
    fontSize: 18,
    fontWeight: '100',
    fontFamily: 'sans-serif',
    marginBottom: 4,
    color: '#000000',

  }
});

/*
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
*/
export default EventCard
// onPress={navigation.navigate('eventScreen', event={event})}
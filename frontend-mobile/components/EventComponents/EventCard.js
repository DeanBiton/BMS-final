import React from 'react'
import { View, Pressable, StyleSheet, Text} from 'react-native'
import * as dayjs from 'dayjs'

function EventCard(props) {
    const event = props.event.item
    const navigation = props.navigation
    const onPress = () => {
        navigation.navigate('eventScreen', {id: event._id})
    }
    const date = new Date(event.date)
    const timeStart = new Date(event.timeStart).toLocaleTimeString().substring(0,5)
    const timeEnd = new Date(event.timeEnd).toLocaleTimeString().substring(0,5)

  return (
    <View style={styles.container} elevation={5}>
    <Pressable style={styles.pressable} onPress={onPress}>
      <View style={styles.s}>
        <Text style={styles.text}>{
`Location: ${event.city}, ${event.address}
Date: ${date.toLocaleDateString('en-US')}
Hours: ${timeStart} - ${timeEnd}`
          }
        </Text>
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
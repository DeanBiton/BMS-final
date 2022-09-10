import React from 'react'
import { View, Pressable, StyleSheet, Text} from 'react-native'
import * as dayjs from 'dayjs'

function EventCard(props) {
    const event = props.event.item
    const {navigation} = props
    
    if(!event)
      return <></>
    
    const onPress = () => {
        navigation.navigate('eventScreen', {id: event._id})
    }
    const date = new Date(event.date)
    const dateText = date.toLocaleDateString('en-GB')
    const timeStart = new Date(event.timeStart).toLocaleTimeString().substring(0,5)
    const timeEnd = new Date(event.timeEnd).toLocaleTimeString().substring(0,5)
    const status = event.status
    let statusText = status.concat(" ".repeat(11 - status.length))
    let statusColor
    if (status === 'Active') {
      statusColor = '#00FFFF';
    } 
    else if (status === 'In progress') {
      statusColor = '#ffa500';
    }
    else {
      statusColor = '#ff0000';
    }

  return (
    <View style={styles.container} elevation={5}>
    <Pressable style={styles.pressable} onPress={onPress}>
      <View style={styles.s}>

        <Text style={styles.text}>{
`Location: ${event.city}, ${event.address}
Date: ${dateText}
Hours: ${timeStart} - ${timeEnd}`
          }
        </Text>

        <Text style={{
        alignSelf:'flex-end',
        color: statusColor,
        marginBottom: 5,
        marginRight: 5,}}>
          {statusText}
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
    flexDirection: 'row-reverse',
    height: 70,
    width: '90%',
    marginHorizontal: 10,
    marginVertical: 8,
    justifyContent: 'center'
  },
  text:{
    // flex: 1,
    fontSize: 18,
    fontWeight: '100',
    fontFamily: 'sans-serif',
    marginBottom: 4,
    color: '#000000',
    width: '75%'
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
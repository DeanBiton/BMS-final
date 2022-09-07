import {useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
import { getRegisters } from '../../features/registers/registerSlice'
import {resetRegisters} from '../../features/registers/registerSlice'
import EventCard from './EventCard'
import VegaScrollList from './Scroller/ScrollList'

function EventsScreen({navigation}) {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
      (state) => state.events
  )
  
  let eventCardElements
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    console.log("Activate")
    if (!user) {
      navigation.navigate('Home')
    }
    else
    {
      dispatch(getEvents())
      dispatch(getRegisters())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if(isLoading)
  {
    return(
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  eventCardElements = 
    <VegaScrollList
      distanceBetweenItem={12}
      data={events}
      keyExtractor={event => event._id}
      renderItem={event =><EventCard event={event} navigation={navigation}/>}>
    </VegaScrollList>

  return (
    <View style={styles.container}>
        {eventCardElements}
    </View>
  )
}
export default EventsScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: '#D3D3D3',
    height: '100%',
  },
});

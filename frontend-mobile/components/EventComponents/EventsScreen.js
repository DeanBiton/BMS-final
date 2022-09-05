import {useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
import EventCard from './EventCard'

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

    if (!user) {
      navigation.navigate('Home')
    }
    else
    {
      dispatch(getEvents())
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
  else
  {
    eventCardElements = events.map((event => {
      return <EventCard key={event._id} event={event} navigation={navigation}/>
    }))
  }

  return (
    <ScrollView>
        {eventCardElements}
    </ScrollView>
  )
}
export default EventsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
});

import {useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../features/events/eventSlice'
import EventCard from './EventComponents/EventCard'

function EventsScreen({navigation}) {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
      (state) => state.events
  )

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

  const eventCardElements = events.map((event => {
    return <EventCard event={event} navigation={navigation}/>
  }))

  return (
    <ScrollView>
        {eventCardElements}
        {eventCardElements}
        {eventCardElements}
        {eventCardElements}
        {eventCardElements}
        {eventCardElements}
        {eventCardElements}
        {eventCardElements}
    </ScrollView>
  )
}
export default EventsScreen
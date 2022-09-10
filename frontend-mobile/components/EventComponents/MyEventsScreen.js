import {useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../../features/events/eventSlice'
import { getRegisters } from '../../features/registers/registerSlice'
import { getDonations } from '../../features/donations/donationSlice'
import EventCard from './EventCard'
import VegaScrollList from './Scroller/ScrollList'

function MyEventsScreen({navigation}) {

  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
      (state) => state.events
  )
  const {registers, isLoadingRegister} = useSelector(
    (state) => state.registers
  )
  const {donations, isLoadingDonation} = useSelector(
    (state) => state.donations
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
      dispatch(getRegisters())
      dispatch(getDonations())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if(isLoading || isLoadingRegister || isLoadingDonation)
  {
    return(
      <View style={styles.loading}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  const myEvents = []
  events.forEach((event) => {
    if(registers.includes(event._id) || donations.includes(event._id))
      myEvents.push(event)
  });

  eventCardElements = 
    <VegaScrollList
      distanceBetweenItem={12}
      data={myEvents}
      keyExtractor={event => event._id}
      renderItem={event =><EventCard event={event} navigation={navigation}/>}>
    </VegaScrollList>

  return (
    <View style={styles.container}>
        {eventCardElements}
    </View>
  )
}
export default MyEventsScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    backgroundColor: '#D3D3D3',
    height: '100%',
  },
  loading:{
    height: '100%',
    justifyContent: 'center',
  },
});

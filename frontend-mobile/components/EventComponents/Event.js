import { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { createRegister, resetRegisters, deleteRegister } from '../../features/registers/registerSlice'
import { refreshEvent } from '../../features/events/eventSlice'
import image from '../../assets/images/cities/Modiin.jpg'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar/ProgressBar';
import CustomButton from '../CustomButton/CustomButton'

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function Event({route}) {
    const {id} = route.params

    //Register
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { registers, isLoadingRegister, isError, isSuccess, message } = useSelector(
        (state) => state.registers
    )
    const {events} = useSelector(
        (state) => state.events
    )

    const [event, setEvent] = useState(events.find((event) => event._id === id))
    const [rerender, setRerender] = useState(false);
    
    let register = registers.find((register) =>{
        return register === event._id
    })

    useEffect(() => {
      dispatch(refreshEvent({id: id}))
      setRerender(!rerender);
      setEvent(events.find((event) => event._id === id))
    },
    [register, events])

    const onPress = () => {
        if(register === undefined)
        {
            register = dispatch(createRegister({eventId: event._id}))
        }
        else
        {
            dispatch(deleteRegister({id: event._id}))
            register = undefined
        }
    }   

    // Event
    const date = new Date(event.date).toLocaleDateString('en-GB')
    const timeStart = new Date(event.timeStart).toLocaleTimeString().substring(0,5)
    const timeEnd = new Date(event.timeEnd).toLocaleTimeString().substring(0,5)

    const progressBarElements = Object.keys(event.bloodTypeDonated).map((name) =>{
        if(name !== 'Not specified')
        {
            return(
                <View style={styles.row} key={name}>
                    <Text style={styles.bloodName}>{name}</Text>
                    <ProgressBar current={event.bloodTypeRegisters[name]} max={event.bloodTypeDemands[name]}/>
                </View>
            )
        }
        else
            return (<View key={name}></View>)
    })





    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image style={styles.imageStyle} source={image} />
                    <View style={styles.infoStyle}>
                        <Text style={styles.titleStyle}>{`${event.city} ${date}`}</Text>
                        <View style={styles.row}>
                            <Ionicons name="md-location-outline" size={22} style={styles.screenIcon}/>
                            <Text style={styles.rowText}>{event.address}</Text>    
                        </View>
                        <View style={styles.row}>
                            <Ionicons name="md-time-outline" size={22} style={styles.screenIcon}/>
                            <Text style={styles.rowText}>{`${timeStart}-${timeEnd}`}</Text>    
                        </View>
                        {progressBarElements}
                        <View style={styles.button}>
                            <CustomButton onPress={onPress} text={isLoadingRegister? "" : (register === undefined? "Register" : "Unregister")} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

//
const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // justifyContent: "center",
      //backgroundColor: '#D3D3D3',
      height: '100%',
      marginTop: 30,
      marginLeft: '5%',
      paddingBottom: 10,
    },
    cardContainer: {
        width: deviceWidth - offset,
        backgroundColor: '#D3D3D3',
        //height: 500,
        borderRadius: radius,

        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
      },
      imageStyle: {
        height: 150,
        width: deviceWidth - offset,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
      },
      infoStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
      },
      titleStyle: {
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
        paddingBottom: 10,
      },
      row:{
        flex: 1, 
        flexDirection: 'row-reverse',
        width: '100%',
        paddingBottom: 5,
      },
      screenIcon:{
        marginLeft: 10,
      },
      rowText:{
        fontWeight: '500',
        fontSize: 15,
      },
      bloodName:{
        paddingTop: 5,
        paddingRight: 10,
      },
      button:{
        paddingTop: 95,
        marginBottom: 10,
        width: '110%',
      }
});

export default Event

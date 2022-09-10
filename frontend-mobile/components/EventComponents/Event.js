import { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, ActivityIndicator, Linking, Pressable} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { createRegister, resetRegisters, deleteRegister } from '../../features/registers/registerSlice'
import { refreshEvent } from '../../features/events/eventSlice'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from './ProgressBar/ProgressBar';
import CustomButton from '../CustomButton/CustomButton'
import cities from '../../assets/images/cities/cities'
import image from '../../assets/images/cities/Modiin.jpg'
import waze from '../../assets/images/waze.png'
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
    
    // prevent render error when updating code only (not needed for production)
    if(!events)
      return <></>
    
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
    const status = event.status
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

    const userDate = new Date(user.lastDonated)
    const nextRegisterDate = new Date(userDate.setMonth(userDate.getMonth()+3))
    //const nextRegisterDate = new Date(nextRegisterDatee.setDay(nextRegisterDatee.getDay()+1))

    let type
    if(status === "Ended")
      type = status
    else if(user.lastDonated !== null && new Date(event.date) < nextRegisterDate)
      type = "No permission"
    else if (register === undefined)
      type = register
    else 
      type = "Unregister"
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image style={styles.imageStyle} source={image} />
                    <View style={styles.infoStyle}>
                        <Text style={styles.titleStyle}>{`${date}`}</Text>
                        <Text style={styles.titleStyle}>{`${event.city}`}</Text>
                        <View style={styles.row}>
                            <Ionicons name="md-location-outline" size={22} style={styles.screenIcon}/>
                            <Text style={styles.rowText}>{event.address}</Text>    
                        </View>
                        <View style={styles.row}>
                            <Ionicons name="md-time-outline" size={22} style={styles.screenIcon}/>
                            <Text style={styles.rowText}>{`${timeStart}-${timeEnd}`}</Text>    
                        </View>
                        {progressBarElements}

                        {isLoadingRegister? (
                          <View style={styles.buttonLoading}>
                            <CustomButton 
                              onPress={onPress} 
                              text={""} 
                              disable={true}
                              type={undefined}
                            />
                            <View style={styles.activityIndicator}>
                              <ActivityIndicator color="#ffffff"/>
                            </View>
                          </View>
                        ) : (
                          <View style={type==="No permission" ? styles.buttonWithMessage : styles.button}>
                            <CustomButton 
                              onPress={onPress} 
                              text={type==="No permission"? "3 months since last donation hasn't past" : status === "Ended"? "Ended" : isLoadingRegister? "" : (register === undefined? "Register" : "Unregister")} 
                              disable={status === "Ended" || type==="No permission"}
                              type={type}
                            />
                          </View>
                        )}
                        
                        {type==="No permission" &&
                        <Text style={styles.message}>
                          Can register from: {nextRegisterDate.toLocaleDateString('en-GB')}
                        </Text>}

                        <View style={{alignItems: 'center',}}>
                        <Pressable 
                        onPress={() => Linking.openURL(`https://waze.com/ul?q=${event.address}+${event.city}`)} 
                        style={styles.wazePressable} 
                      >
                        <View style={styles.wazeView}>
                         <Image
                        source={waze}
                        style={styles.wazeImage}
                        ></Image>
                        <Text style={styles.wazeText}>Navigate</Text>
                        </View>
                      </Pressable>
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
      height: '130%',
      marginTop: 30,
      marginLeft: '5%',
      paddingBottom: 5,
    },
    cardContainer: {
        width: deviceWidth - offset,
        backgroundColor: '#D3D3D3',
        //height: '92%',
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
        paddingBottom: 7,
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
        width: 60,
      },
      button:{
        paddingTop: 21,
        marginBottom: 39,
        width: '110%',
      },
      buttonWithMessage:{
        paddingTop: 21,
        marginBottom: 5,
        width: '110%',
      },
      buttonLoading:{
        paddingTop: 21,
        marginBottom: 19,
        width: '110%',
      },
      activityIndicator:{
        top: -40,
        right: 14,
      },
      message:{
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 10,
        color: '#FF0000',
      },
      wazePressable:{
        backgroundColor: '#93c4d3',

        width: '60%',
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        //flexDirection: 'row'
      },
      wazeText:{
        fontWeight: '500',
        fontSize: 15,
        paddingTop: 5,
        paddingRight: 20,
      },
      wazeImage:{
        height: 35, 
        width: 35, 
      },
      wazeView:{
        flexDirection: 'row', 
        height: 30,
        
      }
});

export default Event

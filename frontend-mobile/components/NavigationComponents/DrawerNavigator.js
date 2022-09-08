import { useEffect } from 'react'
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from '../HomeScreen';
import EventsScreen from '../EventComponents/EventsScreen';
import MyEventsScreen from '../EventComponents/MyEventsScreen';
import ProfileScreen from '../ProfileScreen'
import CustomDrawer from './CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import headerImage from '../../assets/images/menu-bg.jpeg'

const Drawer = createDrawerNavigator()

function DrawerNavigator(props) {

  const headerButtonElement = () => {return(
    <TouchableOpacity
      onPress={() => props.navigation.dispatch(DrawerActions.openDrawer()) }
      style={styles.headerTouchableOpacity}
    >
      <View>
        <Ionicons name="menu-sharp" size={35} />
      </View>
    </TouchableOpacity>
  )}

  const setHeaderImage = () => {return(
    <Image
        source={headerImage}
      />
  )}
  
  return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={options.drawerNavigator}>
        <Drawer.Screen name="Home" component={HomeScreen} style={{flexDirection: 'row',}} options={{
          drawerIcon : ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} style={styles.drawerIcon}/>
          ),
          headerLeft: headerButtonElement,
          headerStyle: styles.header,
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
            left: 100
          },
        }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{
          drawerIcon : ({color}) => (
            <Ionicons name="person" size={22} color={color} style={styles.drawerIcon}/>
          ),
          headerLeft: headerButtonElement,
          headerStyle: styles.header,
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
            left: 100
          },
        }}/>
        <Drawer.Screen name="Events" component={EventsScreen} options={{
          drawerIcon : ({color}) => (
            <Ionicons name="ios-calendar-sharp" size={22} color={color} style={styles.drawerIcon}/>
          ),
          headerLeft: headerButtonElement,
          headerStyle: styles.header,
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
            left: 100
          },
        }}/>
        <Drawer.Screen name="My Events" component={MyEventsScreen} options={{
          drawerIcon : ({color}) => (
            <Ionicons name="folder-open-outline" size={22} color={color} style={styles.drawerIcon}/>
          ),
          headerLeft: headerButtonElement,
          headerStyle: styles.header,
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
            left: 100
          },
        }}/>
      </Drawer.Navigator>
  )
}

const options = {
  drawerNavigator:{
    //headerShown: false,
    drawerActiveBackgroundColor: '#aa18ea',
    drawerActiveTintColor: '#fff',
    drawerInactiveTintColor: '#333',
    drawerPosition: 'left',
    drawerLabelStyle: {
      marginLeft: -25,
      //fontFamily: 'Roboto-Medium',
      fontSize: 15,
    },
    drawerStyle: {
      width: '80%',
    }
  },
  drawerScreen:{
    headerLeft: () => (
      <Button
        onPress={() => console.log('This is a button!')}
        title="Info"
        color="#fff"
      />
    )
  }
}

const styles = StyleSheet.create({
  drawerIcon:{
    width: '60%',
    left: 100,
  },
  headerTouchableOpacity:{
    left: 320,
  },
  header:{
    backgroundColor: "rgb(239,1,20)", // logo red : '#ef0114' || rgb(239,1,20)
    //color: '#ef0114'
  }
});
export default DrawerNavigator

/*
NOTE: fill all page:

headerBackground: () => (
      <Image
        style={StyleSheet.absoluteFill}
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
      />
    ),
*/
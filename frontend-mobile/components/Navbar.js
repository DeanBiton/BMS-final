import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './HomeScreen';
import EventsScreen from './EventsScreen';
import SignInScreen from './SignInScreen';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const Drawer = createDrawerNavigator()

function Navbar() {
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
  }, [user,])

  return (
      <Drawer.Navigator>
        {user != null ? <Drawer.Screen name="SignIn" component={SignInScreen} /> : <></>}
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Events" component={EventsScreen} />
      </Drawer.Navigator>
  )
}

// <NavigationContainer>
export default Navbar
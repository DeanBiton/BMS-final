import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './HomeScreen';
import EventsScreen from './EventsScreen';

const Drawer = createDrawerNavigator()

function Navbar() {
    return (
      <NavigationContainer>
          <Drawer.Navigator useLegacyImplementation initialRouteName='Check'>
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Events" component={EventsScreen} />
          </Drawer.Navigator>
      </NavigationContainer>
    )
  }

export default Navbar
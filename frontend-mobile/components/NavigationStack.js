import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Navbar from './Navbar'
import Event from './EventComponents/Event'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

function NavigationStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="drawer"
                component={Navbar}
                headerShown={false}
                options={{headerMode: 'none', headerShown: false}}
            />
            <Stack.Screen 
                name="eventScreen"
                component={Event}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationStack
import { StyleSheet } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import SignInScreen from '../SignInScreen';
import DrawerNavigator from './DrawerNavigator'
import Event from '../EventComponents/Event'

const Stack = createStackNavigator()

function NavigationStack() {

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        <Stack.Screen 
          name="SignInScreen"
          component={SignInScreen}
          options={options.stackScreenSignIn}
        />
        <Stack.Screen 
          name="drawer"
          component={DrawerNavigator}
          options={options.stackScreenDrawer}
        />
        <Stack.Screen 
          name="eventScreen"
          component={Event}
          options={options.stackScreenEvent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const options = {
  stackScreenSignIn:{
    headerShown: false
  },
  stackScreenDrawer:{
    headerMode: 'none', 
    headerShown: false,
  },
  stackScreenEvent:{
    headerShown: false
  },
}

const styles = StyleSheet.create({
  drawerHeader:{
    color: '#ef0114'
  },
});

export default NavigationStack
//headerTintColor
import {createStackNavigator} from '@react-navigation/stack'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import SignInScreen from '../SignInScreen';
import DrawerNavigator from './DrawerNavigator'
import Event from '../EventComponents/Event'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          />
          <Stack.Screen 
            name="drawer"
            component={DrawerNavigator}
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
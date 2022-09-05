import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import SignInScreen from '../SignInScreen';
import AppDrawer from './AppDrawer'
import Event from '../EventComponents/Event'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator()

function NavigationStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="SignInScreen"
            component={SignInScreen}
          />
          <Stack.Screen 
            name="drawer"
            component={AppDrawer}
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
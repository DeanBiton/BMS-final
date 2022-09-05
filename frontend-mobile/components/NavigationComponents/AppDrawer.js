import { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import HomeScreen from '../HomeScreen';
import EventsScreen from '../EventComponents/EventsScreen';
//import SignInScreen from '../SignInScreen';

const Drawer = createDrawerNavigator()

function AppDrawer() {
  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
  }, [user,])

  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Events" component={EventsScreen} />
      </Drawer.Navigator>
  )
}

//{user != null ? <Drawer.Screen name="SignIn" component={SignInScreen} /> : <></>}
// <NavigationContainer>
export default AppDrawer
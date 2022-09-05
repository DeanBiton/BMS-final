import { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import CustomDrawer from './CustomDrawer';
import HomeScreen from '../HomeScreen';
import EventsScreen from '../EventComponents/EventsScreen';
const Drawer = createDrawerNavigator()

function AppDrawer() {

  return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Events" component={EventsScreen} />
      </Drawer.Navigator>
  )
}


export default AppDrawer
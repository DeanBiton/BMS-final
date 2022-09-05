import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity,} from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer
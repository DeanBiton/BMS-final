import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet,} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import menuBackground from '../../assets/images/menu-blue.png' // menu background image (color)
import logo from '../../assets/images/logo.jpeg'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function CustomDrawer(props) {

  const { navigation } = props
  // Redux
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigation.navigate('SignInScreen')
  }

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentScrollView}>
        <ImageBackground source={menuBackground} style={styles.imageBackground}>
          <Image source={logo} style={styles.imageHeader}/>
          <Text style={styles.userName}>Hello {user? user.name: ""}</Text>
        </ImageBackground>
        <View style={styles.drawerItemList}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={onLogout} style={{paddingVertical: 15}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="exit-outline" size={22} style={styles.screenIcon}/>
              <Text
                style={{
                  fontSize: 15,
                  //fontFamily: 'Roboto-Medium',
                  marginLeft: 10,
                }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
      </View> 
    </View>
    
  )
}
//    purple: '#8200d6',
const styles = StyleSheet.create({
  drawerContentScrollView:{
    backgroundColor: '#0037ff', //top drawer color
  },
  imageBackground: {
    padding: 20,
  },
  imageHeader: {
    height: 110, 
    width: 110, 
    borderRadius: 30, 
    marginBottom: 20,
    marginLeft: '28%'
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    //fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  drawerItemList: {
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 10,
  },
  bottom: {
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#ccc',
  },
  screenIcon:{
    width: '60%',
    left: 100,
  },
});

export default CustomDrawer


import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions, ImageBackground, Dimensions } from 'react-native';
import logo from '../assets/images/logo.jpeg';
import CustomInput from './CustomInput/CustomInput';
import CustomButton from './CustomButton/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import {login, reset } from '../features/auth/authSlice';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import background from '../assets/images/background.png'
 
function SignInScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Redux
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  
  useEffect(() => {
    if (isError) {
      console.warn(message)
    }

    //dispatch(getUser())

    if (isSuccess || user) {
      navigation.navigate('drawer')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigation, dispatch])

  const onSignInPress = (e) => {
    e.preventDefault()

    const userData = {
      email: username,
      password,
    }

    dispatch(login(userData))
  }
  
  return (
    
    <View style={styles.root}>
      
      <Image 
        source={logo} 
        style={styles.logo} 
        resizeMode="contain"
  
      />
      <View style={styles.top}></View>
      <CustomInput 
        placeholder="Username" 
        value={username} 
        setValue={setUsername}
      />
      <CustomInput 
        placeholder="Password" 
        value={password} 
        setValue={setPassword}
        secureTextEntry
      />

      <View style={styles.between}></View>
      <CustomButton 
        text="Sign In" 
        onPress={onSignInPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#474e68',
    height: '100%'
  },
  logo: {
    marginTop: 10,
    width: '45%',
    maxWidth: 300,
    maxHeight: 200,
    size: 200,
    marginBottom: 10,
  },
  top: {
    paddingBottom: '10%'
  },
  between: {
    marginTop: 20,
  }
});

export default SignInScreen;
/*
Code for background in the SignInScreen ( canceled because of low pic resolution)
<ImageBackground 
        source={require('../assets/images/background.png')}
        resizeMode={'cover'}
        onError={handleError}
        style={
          {
            //width: '80%',
            flex: 1,
            justifyContent: "center",
            width: d.height * 0.5,
            //height: d.width,
          }}
        >
  </ImageBackground>
*/
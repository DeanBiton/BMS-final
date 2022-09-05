import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import logo from '../assets/images/logo.jpeg';
import CustomInput from './CustomInput/CustomInput';
import CustomButton from './CustomButton/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import {login, reset } from '../features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignInScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

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
        style={[styles.logo, {height: height * 0.3}]} 
        resizeMode="contain"  
      />
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

      <CustomButton text="Sign In" onPress={onSignInPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: '45%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;

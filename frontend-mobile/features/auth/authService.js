import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.43.78:5000/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    AsyncStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    AsyncStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  AsyncStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
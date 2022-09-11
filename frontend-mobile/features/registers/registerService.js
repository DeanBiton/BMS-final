import axios from 'axios'

const API_URL = 'https://bloodmanagementsystemapp.herokuapp.com/api/registers/'

// Create new register
const createRegister = async (registerData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, registerData, config)
  
    return response.data
}

// Get all my registers
const getRegisters = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

// Delete register
const deleteRegister = async (registerData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + registerData.id, config)
  
    return response.data
}

const registerService = {
    createRegister, getRegisters, deleteRegister
  }
  
  export default registerService
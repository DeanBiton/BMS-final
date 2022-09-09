import axios from 'axios'

const API_URL = '/api/donations/'

// Create new donation
const createDonation = async (donationData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, donationData, config)
  
    return response.data
}

// Get all my donations
const getDonations = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

// Delete donation
const deleteDonation = async (donationData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + donationData.id, config)
  
    return response.data
}

// Get Event Registers
const getEventRegisters = async (donationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'event/' + donationData.id, donationData, config)
  return response.data
}

const donationService = {
  createDonation, getDonations, deleteDonation, getEventRegisters
  }
  
  export default donationService
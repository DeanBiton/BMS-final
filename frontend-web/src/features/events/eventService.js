import axios from 'axios'

const API_URL = '/api/events/'

// Get user goals
const getEvents = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

const eventService = {
    getEvents,
}

export default eventService
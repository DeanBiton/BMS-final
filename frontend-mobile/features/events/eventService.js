import axios from 'axios'

const API_URL = 'http://192.168.108.78:5000/api/events/'

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, eventData, config)

  return response.data
}

// Get all events
const getEvents = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

// Update event
const updateEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + eventData.id, eventData, config)
  return response.data
}

// Delete event
const deleteEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + eventData.id, config)

  return response.data
}

const eventService = {
  createEvent, getEvents, updateEvent, deleteEvent
}

export default eventService
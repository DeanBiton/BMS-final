import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import eventReducer from '../features/events/eventSlice'
import registerReducer from '../features/registers/registerSlice'
import donationReducer from '../features/donations/donationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    events: eventReducer,
    registers: registerReducer,
    donations: donationReducer,
  },
})

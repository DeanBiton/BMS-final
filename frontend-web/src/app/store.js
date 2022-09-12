import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/events/eventSlice'
import registerReducer from '../features/registers/registerSlice'
import donationReducer from '../features/donations/donationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    registers: registerReducer,
    donations: donationReducer,
  },
})

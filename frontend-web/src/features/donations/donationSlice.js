import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import donationService from './donationService'

const initialState = {
    donations: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new Donation
export const createDonation = createAsyncThunk(
    'donations/create',
    async (donationData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await donationService.createDonation(donationData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Get donations
export const getDonations = createAsyncThunk(
    'donations/getMy',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await donationService.getDonations(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Delete donation
export const deleteDonation = createAsyncThunk(
    'donations/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await donationService.deleteDonation(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// get event registers
export const getEventRegisters = createAsyncThunk(
  'donations/event',
  async (donationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await donationService.getEventRegisters(donationData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const donationSlice = createSlice({
    name: 'donation',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDonation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDonation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //state.donations.push(action.payload)
            })
            .addCase(createDonation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDonations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDonations.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.donations = action.payload
            })
            .addCase(getDonations.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteDonation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteDonation.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.donations = state.donations.filter(
                (donation) => donation !== action.payload.id
              )
            })
            .addCase(deleteDonation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getEventRegisters.pending, (state) => {
              state.isLoading = true
            })
            .addCase(getEventRegisters.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.donations = action.payload
            })
            .addCase(getEventRegisters.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
    },
})

export const { reset } = donationSlice.actions
export default donationSlice.reducer
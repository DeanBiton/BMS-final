import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registerService from './registerService'

const initialState = {
    registers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new Register
export const createRegister = createAsyncThunk(
    'registers/create',
    async (registerData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await registerService.createRegister(registerData, token)
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

// Get registers
export const getRegisters = createAsyncThunk(
    'registers/getMy',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await registerService.getRegisters(token)
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

// Delete register
export const deleteRegister = createAsyncThunk(
    'registers/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await registerService.deleteRegister(id, token)
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

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.registers.push(action.payload)
            })
            .addCase(createRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRegisters.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRegisters.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.registers = action.payload
            })
            .addCase(getRegisters.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRegister.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.registers = state.registers.filter(
                (register) => register !== action.payload.id
              )
            })
            .addCase(deleteRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = registerSlice.actions
export default registerSlice.reducer
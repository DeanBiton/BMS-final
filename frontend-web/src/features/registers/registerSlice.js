import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registerService from './registerService'

const initialState = {
    registers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
})

export const { reset } = registerSlice.actions
export default registerSlice.reducer
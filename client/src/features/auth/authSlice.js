import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
}

export const googleAuth = createAsyncThunk(
  'profile/googleAuth',
  async (authData, thunkAPI) => {
    try {
        localStorage.setItem('profile', JSON.stringify({ ...authData }));
        return await authData
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

export const logout = createAsyncThunk(
  'profile/logout',
  async (_id, thunkAPI) => {
    try {
      localStorage.clear();
      return null
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

export const authSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(googleAuth.fulfilled, (state, action) => {
          state.profile=action.payload
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.profile=action.payload
        })
    },
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer
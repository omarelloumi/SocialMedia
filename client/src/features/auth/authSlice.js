import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
// Get user from localStorage
const profile = JSON.parse(localStorage.getItem('profile'))

const initialState = {
  profile: profile ? profile : null
}

export const signin = createAsyncThunk(
  'auth/signin', 
  async (user, thunkAPI) => {
    try {
      console.log(user)
      const { data } = await authService.signin(user)
      return {data , user}
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const signup = createAsyncThunk(
  'auth/signup', 
  async (user, thunkAPI) => {
    try {
      const { data } = await authService.signup(user)
      return {data , user}
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

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
          state.profile=action.payload;
          console.log(action.payload)
          action.payload.navigate('/');
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.profile=action.payload
        })
        .addCase(signin.fulfilled, (state, action) => {
          state.profile=action.payload.data;
          action.payload.user.navigate('/');
        })
        .addCase(signup.fulfilled, (state, action) => {
          state.profile=action.payload.data;
          action.payload.user.navigate('/');
        })
    },
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer
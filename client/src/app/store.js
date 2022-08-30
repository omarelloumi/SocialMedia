import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    profile: authReducer,
  },
})
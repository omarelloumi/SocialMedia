import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as postService from './postService'

const initialState = {
  posts: [],
}

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      console.log("9bal el requette",postData);
      return await postService.createPost(postData)
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

export const updatePost = createAsyncThunk(
  'posts/update',
  async (postData, thunkAPI) => {
    try {
      return await postService.updatePost(postData._id,postData)
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

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (_, thunkAPI) => {
    try {
      return await postService.fetchPosts()
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

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId, thunkAPI) => {
    try {
      return await postService.deletePost(postId)
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

export const likePost = createAsyncThunk(
    'posts/like',
    async (postId, thunkAPI) => {
      try {
        return await postService.likePost(postId)
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts=action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts=state.posts.filter(
          (post) => post._id !== action.payload.id
        )
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts=state.posts.map((post) => post._id === action.payload.id ? action.payload : post)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts=state.posts.map((post) => post._id === action.payload.id ? action.payload : post)
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
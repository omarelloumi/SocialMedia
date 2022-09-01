import axios from 'axios';

const API = 'http://localhost:5000/posts'


export const fetchPosts = async () => {
    const response = await axios.get(API)
    return response.data
}
export const createPost = async (newPost,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.post(API,newPost,config)
    return response.data
}
export const updatePost = async (id, updatedPost,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.patch(API+`/${id}`, updatedPost,config);
    return response.data
}
export const deletePost = async (id,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.delete(API+`/${id}`,config);
    return response.data
}
export const likePost = async (id,token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const response = await axios.patch(API+`/${id}/likePost`,config);
    return response.data
}
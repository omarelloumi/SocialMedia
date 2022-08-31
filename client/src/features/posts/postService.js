import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/posts' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const fetchPosts = async () => {
    const response = await API.get()
    return response.data
}
export const createPost = async (newPost) => {
    const response = await API.post(newPost)
    return response.data
}
export const updatePost = async (id, updatedPost) => {
    const response = await API.patch(`/${id}`, updatedPost);
    return response.data
}
export const deletePost = async (id) => {
    const response = await API.delete(`/${id}`);
    return response.data
}
export const likePost = async (id) => {
    const response = await API.patch(`/${id}/likePost`);
    return response.data
}
import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = async () => {
    const response = await axios.get(url)
    return response.data
}
export const createPost = async (newPost) => {
    const response = await axios.post(url,newPost)
    return response.data
}
export const updatePost = async (id, updatedPost) => {
    const response = await axios.patch(`${url}/${id}`, updatedPost);
    return response.data
}
export const deletePost = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    return response.data
}
export const likePost = async (id) => {
    const response = await axios.patch(`${url}/${id}/likePost`);
    return response.data
}
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/user' });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

const signup = async (userData) => {
    const response = await API.post('/signup', userData);
    if (response.data) {
        localStorage.setItem('profile', JSON.stringify(response.data))
    }

    return response.data;
}

const signin = async (userData) => {
    const response = await API.post('/signin', userData);
    if (response.data) {
        localStorage.setItem('profile', JSON.stringify(response.data))
    }
    return response.data;
}

const authService = {
    signup,
    signin
}
  
export default authService
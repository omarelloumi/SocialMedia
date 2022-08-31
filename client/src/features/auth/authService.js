import axios from 'axios';

const url = 'http://localhost:5000/user';

const signup = async (userData) => {
    const response = await axios.post(url + '/signup', userData);
    if (response.data) {
        localStorage.setItem('profile', JSON.stringify(response.data))
    }

    return response.data;
}

const signin = async (userData) => {
    const response = await axios.post(url + '/signin', userData);
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
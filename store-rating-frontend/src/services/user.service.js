import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

const updatePassword = (currentPassword, newPassword) => {
    return axios.put(API_URL + 'password', {
        currentPassword,
        newPassword
    }, { headers: authHeader() });
};

const UserService = {
    updatePassword,
};

export default UserService;
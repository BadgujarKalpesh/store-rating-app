import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

const getDashboardStats = () => {
    return axios.get(API_URL + 'admin/stats', { headers: authHeader() });
};

const getAllUsers = (params) => {
    return axios.get(API_URL + 'admin/users', { headers: authHeader(), params });
};

const getAllStores = (params) => {
    return axios.get(API_URL + 'stores', { headers: authHeader(), params });
};

const createStore = (name, email, address, ownerId) => {
    return axios.post(API_URL + 'stores', { name, email, address, ownerId }, { headers: authHeader() });
};

const createUser = (name, email, password, address, role) => {
    return axios.post(API_URL + 'admin/users', { name, email, password, address, role }, { headers: authHeader() });
};

const AdminService = {
    getDashboardStats,
    getAllUsers,
    getAllStores,
    createStore,
    createUser
};

export default AdminService;

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

const getAllStores = (params) => {
    return axios.get(API_URL + 'stores', { headers: authHeader(), params });
};

const rateStore = (storeId, rating) => {
    return axios.post(API_URL + `stores/${storeId}/rate`, { rating }, { headers: authHeader() });
};

const getOwnerStoreDetails = () => {
    return axios.get(API_URL + 'owner/store', { headers: authHeader() });
};

const StoreService = {
    getAllStores,
    rateStore,
    getOwnerStoreDetails
};

export default StoreService;

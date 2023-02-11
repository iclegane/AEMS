import axios from 'axios';
import {API_URL} from '@utils/constants';


const TRANSPORT = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

TRANSPORT.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
});

export default TRANSPORT;

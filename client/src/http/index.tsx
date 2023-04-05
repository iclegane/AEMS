import axios from 'axios';
import { API_URL } from '@utils/constants';
import AuthService from '../service/AuthService';


const TRANSPORT = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

TRANSPORT.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
});

TRANSPORT.interceptors.response.use((config) => config,async (error) => {

    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await AuthService.refresh();

            localStorage.setItem('token', response.data.accessToken);

            return TRANSPORT.request((originalRequest));
        } catch (e) {
            console.log('user !auth');
        }

        throw error;
    }
});

export default TRANSPORT;

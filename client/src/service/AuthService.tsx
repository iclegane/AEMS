import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@utils/constants';
import TRANSPORT from '../http';
import { IAuthResponse } from '../models/response/AuthResponse';


export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return TRANSPORT.post<IAuthResponse>('/auth/login', {
            email,
            password
        });
    }

    static async logout(): Promise<void> {
        return TRANSPORT.post('/auth/logout');
    }

    // to avoid using TRANSPORT.interceptors
    static async refresh(): Promise<AxiosResponse<IAuthResponse>>{
        return await axios.get<IAuthResponse>(`${API_URL}/auth/refresh`, {
            withCredentials: true,
        });
    }
}

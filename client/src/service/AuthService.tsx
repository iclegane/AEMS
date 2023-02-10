import {AxiosResponse} from 'axios';
import TRANSPORT from '../http';
import {IAuthResponse} from '../models/response/AuthResponse';


export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return TRANSPORT.post<IAuthResponse>('/user/login', {
            email,
            password
        });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return TRANSPORT.post<IAuthResponse>('/user/registration', {
            email,
            password
        });
    }

    static async logout(): Promise<void> {
        return TRANSPORT.post('/logout');
    }
}

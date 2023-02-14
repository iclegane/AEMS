import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../service/AuthService';
import {IAuthFields} from '@components/Forms/AuthForm';


export const login = createAsyncThunk(
    'auth/login',
    async (data: IAuthFields, thunkAPI) => {
        try {
            const response = await AuthService.login(data.email, data.password);
            localStorage.setItem('token', response.data.accessToken);

            return response.data;
        } catch (e: unknown) {

            let msg = 'Непредвиденная ошибка';

            if (axios.isAxiosError(e)) {
                e.response?.data?.message ? msg = e.response.data.message : null;
            }

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');

            return response;
        } catch (e: unknown) {

            if (axios.isAxiosError(e)) {
                return thunkAPI.rejectWithValue(e.response?.data?.message);
            }

            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (data, thunkAPI) => {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);

            return response.data;
        } catch (e: unknown) {
            let msg = 'Непредвиденная ошибка';

            if (axios.isAxiosError(e)) {
                e.response?.data?.message ? msg = e.response.data.message : null;
            }

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

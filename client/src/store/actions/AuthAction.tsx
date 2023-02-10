import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../service/AuthService";
import {IAuthFields} from "../../components/Forms/AuthForm";
import axios from 'axios';


export const login = createAsyncThunk(
    'auth/login',
    async (data: IAuthFields, thunkAPI) => {
        try {
            const response = await AuthService.login(data.email, data.password);

            return response.data;
        } catch (e: unknown) {

            let msg = 'Непредвиденная ошибка';

            if (axios.isAxiosError(e)) {
                e.response?.data?.message ? msg = e.response.data.message : null;
            }

            return thunkAPI.rejectWithValue(msg);
        }
    }
)

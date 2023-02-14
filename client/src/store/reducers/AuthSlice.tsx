import {createSlice, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {checkAuth, login, logout} from '../actions/AuthAction';
import {IUser} from "../../models/IUser";


interface IAuthState {
    auth: {
        user: IUser | null,
        isAuth: boolean;
    },
    isLoading: boolean;
    error: string;
}

const initialState: IAuthState = {
    auth: {
        user: null,
        isAuth: false
    },
    isLoading: false,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:  (builder: ActionReducerMapBuilder<IAuthState>) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.auth = {
                user: action.payload.user,
                isAuth: true,
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.error = '';
            state.auth = {
                user: null,
                isAuth: false,
            };
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.auth = {
                user: action.payload.user,
                isAuth: true,
            };
        });
        builder.addCase(checkAuth.rejected, (state) => {
            state.isLoading = false;
            state.auth = {
                user: null,
                isAuth: false,
            };
            state.error = 'error'
        });
    }
});

export default authSlice.reducer;

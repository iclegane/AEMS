import {createSlice, ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {login} from "../actions/AuthAction";


interface IAuthState {
    auth: {
        isAuth: boolean;
    },
    isLoading: boolean;
    error: string;
}

const initialState: IAuthState = {
    auth: {
        isAuth: false,
    },
    isLoading: false,
    error: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:  (builder: ActionReducerMapBuilder<IAuthState>) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state) => {
            state.isLoading = false;
            state.error = '';
            state.auth = {
                isAuth: true,
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string
        })
    }
})

export default authSlice.reducer;

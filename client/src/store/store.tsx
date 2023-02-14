import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import {ProfileService} from "../service/PofileService";


const rootReducer = combineReducers({
    authReducer,
    [ProfileService.reducerPath]: ProfileService.reducer,
});

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProfileService.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

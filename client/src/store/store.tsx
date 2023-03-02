import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import {ProfileService} from '../service/PofileService';
import {api} from '../api/base';


const rootReducer = combineReducers({
    authReducer,
    [ProfileService.reducerPath]: ProfileService.reducer,
    [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        {return getDefaultMiddleware().concat(ProfileService.middleware, api.middleware);},
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

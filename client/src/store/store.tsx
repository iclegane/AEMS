import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import {api} from '../api/base';


const rootReducer = combineReducers({
    authReducer,
    [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
    return configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        {return getDefaultMiddleware().concat(api.middleware);},
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

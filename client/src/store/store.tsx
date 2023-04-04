import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/AuthSlice';
import pageTitleReducer from './reducers/TitleSlice';
import {api} from '../api/base';


const rootReducer = combineReducers({
    authReducer,
    pageTitle: pageTitleReducer,
    [api.reducerPath]: api.reducer,
});

export const setupStore = () => configureStore( {
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

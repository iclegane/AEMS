import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../utils/constants';
import { RootState } from '../store/store';


const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const { isAuth } = (getState() as RootState).authReducer.auth;

        if (isAuth) {
            headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        }

        return headers;
    },
    credentials: 'include',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Tasks', 'Profile', 'Users', 'User'],
    endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({}),
});

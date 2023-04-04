import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API_URL} from '../utils/constants';
import {RootState} from '../store/store';


type Field = {
    name: string;
    value: string | null;
}

export interface ProfileResponse {
    main: Field[],
    personal: Field[],
    contacts: Field[],
}

export interface ProfileRequest {
    id: string;
}

export const ProfileService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, {getState}) => {
            const {isAuth} = (getState() as RootState).authReducer.auth;

            if (isAuth) {
                headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
            }

            return headers;
        },
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        profile: builder.query<ProfileResponse, ProfileRequest>({
            query: (id) => ({
                url: 'profile',
                method: 'POST',
                body: id
            }),
        })
    }),
});

export const { useProfileQuery } = ProfileService;

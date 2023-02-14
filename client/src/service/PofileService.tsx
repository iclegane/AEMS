import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {API_URL} from "../utils/constants";


export interface ProfileResponse {
    important: {
        email: string;
        phone: string | null;
        work_date: string | null;
        employment: string | null;
        post: string | null;
    },
    personal: {
        name: string | null;
        email: string
        birth_date: string | null;
        gender: string | null;
    },
    contacts: {
        address: string | null;
        phone: string | null;
    },
}

export interface ProfileRequest {
    id: string;
}

export const ProfileService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
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
})

export const { useProfileQuery } = ProfileService

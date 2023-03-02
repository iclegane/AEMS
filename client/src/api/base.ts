import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../utils/constants";


const baseQuery = fetchBaseQuery({
    baseUrl: API_URL
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 })

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Tasks'],
    endpoints: () => ({}),
})

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({}),
})

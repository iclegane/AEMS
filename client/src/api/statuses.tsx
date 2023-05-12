import { api } from './base';
import { Status } from '../models/IStatus';


export const statusApi = api.injectEndpoints({
    endpoints: (build) => ({
        getStatuses: build.query<Status[], unknown>({
            query: () => ({
                    url: 'statuses',
                    method: 'GET'
                })
        }),
    })
});

export const {
    useGetStatusesQuery
} = statusApi;

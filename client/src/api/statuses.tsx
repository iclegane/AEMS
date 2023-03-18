import {api} from './base';

type Status = {
    id: string;
    name: string;
}

export const statusApi = api.injectEndpoints({
    endpoints: (build) => {return {
        getStatuses: build.query<Status[], unknown>({
            query: (params) => {
                return {
                    url: 'statuses',
                    method: 'GET'
                };
            }
        }),
    }}
});

export const {
    useGetStatusesQuery
} = statusApi;
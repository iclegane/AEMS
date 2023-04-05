import { api } from './base';


type Status = {
    id: string;
    name: string;
}

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

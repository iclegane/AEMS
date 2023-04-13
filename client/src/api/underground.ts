import { api } from './base';
import { IUnderground } from '../models/IUnderground';


export const undergroundApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUndergrounds: build.query<IUnderground[], unknown>({
            query: () => ({
                url: 'underground',
                method: 'GET'
            })
        }),
    })
});

export const {
    useGetUndergroundsQuery
} = undergroundApi;

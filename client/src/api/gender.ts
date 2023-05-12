import { api } from './base';
import { IRole } from '../models/IRole';


export const genderApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGenders: build.query<IRole[], unknown>({
            query: () => ({
                url: 'genders',
                method: 'GET'
            })
        }),
    })
});

export const {
    useGetGendersQuery
} = genderApi;

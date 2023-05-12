import { api } from './base';
import { IRole } from '../models/IRole';


export const roleApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRoles: build.query<IRole[], unknown>({
            query: () => ({
                url: 'roles',
                method: 'GET'
            })
        }),
    })
});

export const {
    useGetRolesQuery
} = roleApi;

import {api} from "./base";
import {IUser} from "../models/IUser";


export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<IUser[], void>({
            query: () => ({ url: '/users/list' }),
            providesTags: ['Users']
        }),
        addUser: build.mutation<IUser, Partial<IUser>>({
            query: (user) => ({
                url: '/users/add',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users']
        }),
    }),
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
} = usersApi;
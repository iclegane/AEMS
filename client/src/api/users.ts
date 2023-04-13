import { api } from './base';
import { IUser, UserInfoDto } from '../models/IUser';
import { IAddUserFromFields } from '../components/Forms/Users/AddUserForm/types';


export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<IUser[], void>({
            query: () => ({ url: '/users/list' }),
            providesTags: ['Users']
        }),
        getUserByID: build.query<UserInfoDto, { id: string }>({
            query: ({ id }) => ({ url: `/admin/users/${id}` }),
        }),
        addUser: build.mutation<IUser, Omit<IAddUserFromFields, 'confirmPassword'>>({
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
    useGetUserByIDQuery,
    useAddUserMutation,
} = usersApi;

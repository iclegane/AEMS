import { api } from './base';
import { IUpdateUserRequestData, IUser, UserInfoDto } from '../models/IUser';
import { IAddUserFromFields } from '../components/Forms/Users/AddUserForm/types';


export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<IUser[], void>({
            query: () => ({ url: '/admin/users/list' }),
            providesTags: ['Users']
        }),
        getUserByID: build.query<UserInfoDto, { id: string }>({
            query: ({ id }) => ({ url: `/admin/users/${id}` }),
            providesTags: ['User']
        }),
        updateUserByID: build.mutation<UserInfoDto, { id: string, data: IUpdateUserRequestData }>({
            query: ({ id, data }) => ({
                url: `/admin/users/${id}`,
                method: 'PUT',
                body: {
                    data
                }
            }),
            invalidatesTags: [{ type: 'User' }],
        }),
        addUser: build.mutation<IUser, Omit<IAddUserFromFields, 'confirmPassword'>>({
            query: (user) => ({
                url: '/admin/users/add',
                method: 'POST',
                body: {
                    data: user
                },
            }),
            invalidatesTags: ['Users']
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIDQuery,
    useAddUserMutation,
    useUpdateUserByIDMutation,
} = usersApi;

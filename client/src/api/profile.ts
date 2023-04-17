import { api } from './base';
import { ProfileData, UpdateProfileData } from '../models/IProfile';

 
export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        getProfile: build.query<ProfileData, {}>({
          query: () => ({
            url: 'profile',
            method: 'POST'
          }),
          providesTags: ['Profile']
        }),
        updateProfile: build.mutation({
          query: (request: UpdateProfileData) => ({
            url: 'profile',
            method: 'PUT',
            body: {
              data: request
            }
          }),
          invalidatesTags: ['Profile'],
        })
      })
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation
} = profileApi;

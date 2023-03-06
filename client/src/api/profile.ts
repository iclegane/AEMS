import {api} from './base';


interface IGetProfileResponse {
    important: {
        employment: string | null
        post: string | null;
        skills: string[] | [];
    }
    personal: {
        name: string | null;
        birth_date: string | null;
        work_date: string | null;
        gender: string | null;
        post: string | null;
    }
    contacts: {
        address: string | null;
        email: string | null;
        phone: string | null;
        underground: string | null;
    }
}

interface IUpdateProfileRequest {
    important?: {
    }
    personal?: {
        name: string;
        birth_date: string;
        gender: string;
    }
    contacts?: {}
}

export const profileApi = api.injectEndpoints({
    endpoints: build => {return {
        getProfile: build.query<IGetProfileResponse, {}>({
            query: () => {return {
                url: 'profile',
                method: 'POST'
            };},
            providesTags: ['Profile']
        }),
        updateProfile: build.mutation({
            query: (request: IUpdateProfileRequest) => {return {
                url: 'profile',
                method: 'PUT',
                body: {
                    data: request
                },
            };},
            invalidatesTags: ["Profile"]
        })
    };}
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation
} = profileApi;

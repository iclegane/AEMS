import {api} from "./base";


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

export const profileApi = api.injectEndpoints({
    endpoints: build => ({
        getProfile: build.query<IGetProfileResponse, {}>({
            query: () => ({
                url: 'profile',
                method: 'POST'
            }),
            providesTags: ['Profile']
        })
    })
});

export const {
    useGetProfileQuery
} = profileApi;

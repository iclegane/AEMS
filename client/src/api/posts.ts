import { api } from './base';
import { IPost } from '../models/IPost';


export const postsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPosts: build.query<IPost[], unknown>({
            query: () => ({
                url: 'posts',
                method: 'GET'
            })
        }),
    })
});

export const {
    useGetPostsQuery
} = postsApi;

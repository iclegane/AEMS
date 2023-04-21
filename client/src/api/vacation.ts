import { api } from './base';


interface createVacationPdfParams {
    start: string;
    end: string;
    days: number;
} 

export const vacationApi = api.injectEndpoints({
    endpoints: (build) => ({
        createVacationPdf: build.mutation<string, createVacationPdfParams>({
            query: (params) => ({
                url: 'vacation/create',
                method: 'Post',
                body: params
            })
        }),
    })
});

export const {
    useCreateVacationPdfMutation
} = vacationApi;

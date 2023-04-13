import { api } from './base';
import { ISkill } from '../models/ISkill';


export const skillApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSkills: build.query<ISkill[], unknown>({
            query: () => ({
                url: 'skills',
                method: 'GET'
            })
        }),
    })
});

export const {
    useGetSkillsQuery
} = skillApi;

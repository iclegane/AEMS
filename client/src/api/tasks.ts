import {api} from './base';
import {ISort} from '../pages/system/TasksPage/TasksPage';


export interface Task {
    _id: number;
    name: string;
    description: string;
    createdAt: string;
    deadline: string;
    performerID: {
        id: string;
        name: string;
    } | null;
    managerID: {
        id: string;
        name: string;
    } | null;
    statusID: {
        id: string;
        name: string;
    };
}

type TaskResponse = {
    tasks: Task[];
    totalPage: number;
    page: number;
    count: number;
};

export type sortTypes = 'asc' | 'desc' | null;

export interface IGetTaskParams {
    page: number;
    limit: number;
    sort: ISort | null
}

export const postsApi = api.injectEndpoints({
    endpoints: (build) => {return {
        getTasks: build.query<TaskResponse, IGetTaskParams>({
            query: (params) => {
                const {sort, limit, page} = {...params};
 
                return {
                    url: 'tasks',
                    params: {
                        limit,
                        page,
                        sortField: sort?.field,
                        sortType: sort?.type,
                    }
                };
            }
        })
    };}
});


export const {
    useGetTasksQuery
} = postsApi;

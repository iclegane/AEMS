import {api} from './base';
import {ISort} from '../pages/system/TasksPage/TasksPage';


export interface Task {
    id: string;
    name: string;
    description: string;
    created: string;
    updated: string;
    deadline: string;
    body: string,
    performer?: string;
    manager?: string;
    status?: string;
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
            query: ({sort, limit, page}) => {
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
        }),
        getTask: build.query<Task, string>({
            query: (id) => {
                return {
                    url: `tasks/${id}`,
                    method: 'GET'
                };
            },
            providesTags: (_task, _err, id) => {return [{ type: 'Tasks', id }];},
        }),
        updateTask: build.mutation<Task, Partial<Task>>({
            query: ({id, ...patch}) => {
                return {
                    url: `tasks/${id}`,
                    method: 'PUT',
                    body: patch,
                };
            },
            invalidatesTags: (task) => {return [{ type: 'Tasks', id: task?.id }];},
        })
    };}
});


export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useUpdateTaskMutation
} = postsApi;

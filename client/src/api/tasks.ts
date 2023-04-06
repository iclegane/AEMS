import { api } from './base';
import { ISort } from '../pages/system/TasksPage/TasksPage';


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

interface ICreateTask {
    name: string,
    description: string,
    deadline: string,
    body: string,
    performerID: string,
    managerID: string,
}

export const postsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<TaskResponse, IGetTaskParams>({
            query: ({ sort, limit, page }) => ({
                    url: 'tasks',
                    params: {
                        limit,
                        page,
                        sortField: sort?.field,
                        sortType: sort?.type,
                    }
                })
        }),
        getTask: build.query<Task, string>({
            query: (id) => ({
                    url: `tasks/${id}`,
                    method: 'GET'
                }),
            providesTags: (_task, _err, id) => [{ type: 'Tasks', id }],
        }),
        createTask: build.mutation<Partial<Task>, ICreateTask>({
            query: (task) => ({
                    url: 'tasks/add',
                    method: 'POST',
                    body: task
                })
        }),
        updateTask: build.mutation<Task, Partial<Task>>({
            query: ({ id, ...patch }) => ({
                    url: `tasks/${id}`,
                    method: 'PUT',
                    body: patch,
                }),
            invalidatesTags: (task) => [{ type: 'Tasks', id: task?.id }],
        })
    })
});


export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useUpdateTaskMutation,
    useCreateTaskMutation
} = postsApi;

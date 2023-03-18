import {api} from './base';
import {ISort} from '../pages/system/TasksPage/TasksPage';


export interface Task {
    id: number;
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
        }),
        getTask: build.query<Task, string>({
            query: (id) => {
                return {
                    url: `tasks/${id}`,
                    method: 'GET'
                }
            }
        }),
        updateTask: build.mutation({
            query: (props) => {
                return {
                    url: `tasks/:${props.taskID}`,
                    method: 'PUT',
                    body: {
                        taskID: props.taskID,
                        fields: props.fields
                    },
                }
            }
        })
    };}
});


export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useUpdateTaskMutation
} = postsApi;

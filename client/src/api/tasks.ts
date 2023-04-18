import { api } from './base';
import { CreateTaskParamsData, GetTasksParams, Task, TaskListResponseData } from '../models/ITask';

 
export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<TaskListResponseData, GetTasksParams>({
            query: ({ sort, limit, page, filter }) => ({
                url: '/tasks',
                params: {
                    limit,
                    page,
                    filterJson: JSON.stringify(filter),
                    sortJson: JSON.stringify(sort)
                }
            }),
        }),
        getTask: build.query<Task, string>({
            query: (id) => ({
                    url: `tasks/${id}`,
                    method: 'GET'
                }),
            providesTags: (_task, _err, id) => [{ type: 'Tasks', id }],
        }),
        createTask: build.mutation<Task, CreateTaskParamsData>({
            query: (task) => ({
                    url: 'admin/tasks/add',
                    method: 'POST',
                    body: task
                }),
            invalidatesTags: (task) => [{ type: 'Tasks', id: task?.id }],
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
} = tasksApi;

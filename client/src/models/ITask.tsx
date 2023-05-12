import { ISort } from './ISort';


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

export interface TaskListResponseData {
    tasks: Task[];
    totalPage: number;
    page: number;
    count: number;
}

export interface TaskFilter {
    performer?: string;
    manager?: string;
    status?: string[];
}

export interface GetTasksParams {
    page: number;
    limit: number;
    filter: TaskFilter;
    sort: ISort | null
}

export interface CreateTaskParamsData {
    name: string,
    description: string,
    deadline: string,
    body: string,
    performerID: string,
    managerID: string,
}

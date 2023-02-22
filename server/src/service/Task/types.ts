import {ITaskPopulate} from '../../models/task/types';


export interface ITaskListResponse {
    tasks: ITaskPopulate[] | [];
    count: number;
}

export interface ITaskDetailResponse extends ITaskPopulate {
    body: JSON;
}

export interface ITaskListQuery {
    filter?: {
        userID?: string;
        managerID?: string;
    };
    options: {
        limit: number;
        page: number;
    };
}

export interface ITaskAddQuery {
    managerID: string;
    performerID: string;
    name: string;
    body: JSON;
    deadline: Date;
    description: string
}

export interface ITaskUpdateQuery {
    taskID: string;
    fields: {
        statusID?: string;
        name?: string
    }
}

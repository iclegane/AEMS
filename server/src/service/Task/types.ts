import TaskDto from '../../dtos/TaskDto/TaskDto';


export interface ITaskListResponse {
    tasks: TaskDto[];
    count: number;
}

export interface ITaskListQuery {
    filter?: {
        performerID?: string;
        managerID?: string;
    };
    options: {
        limit: number;
        page: number;
        sortField: string;
        sortType: 'asc' | 'desc';
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
    id: string;
    fields: {
        status?: string;
        name?: string
    }
}

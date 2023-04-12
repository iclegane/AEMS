import TaskDto from '../../dtos/TaskDto/TaskDto';


export interface ITaskListResponse {
    tasks: TaskDto[];
    count: number;
}

export interface ITaskListParams {
    limit?: number;
    page?: number;
    sortJson?: string,
    filterJson?: string;
}

export interface Sort {
    field: string;
    type: 'asc' | 'desc';
}

export interface ITaskListFilter {
    performerID?: string;
    managerID?: string;
    status?: string[];
}

export interface ITaskListQuery {
    filter?: ITaskListFilter;
    options: {
        limit: number;
        page: number;
        sort?: Sort,
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

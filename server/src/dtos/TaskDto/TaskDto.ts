import moment from 'moment';
import {Replace} from '../../types/utils';
import {ITaskDocument, ITaskPopulate} from '../../models/task/types';
import {DATE_FORMAT, DATETIME_FORMAT} from '../../utils/constants.js';


type TaskDtoPopulated = Replace<ITaskDocument, {
    statusID: ITaskPopulate['status'];
    managerID: ITaskPopulate['manager'];
    performerID: ITaskPopulate['performer'];
}>;

class TaskDto {
    id;

    name;

    description;

    body;

    deadline;

    performer;

    manager;

    status;

    created;

    updated;
    
    constructor(taskModel: TaskDtoPopulated) {
        this.id = taskModel.id as string;
        this.name = taskModel.name;
        this.description = taskModel.description;
        this.body = taskModel.body;
        this.deadline = moment(taskModel.deadline).format(DATE_FORMAT);
        this.performer = taskModel.performerID?.name;
        this.status = taskModel.statusID?.name;
        this.manager = taskModel.managerID?.name;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.created = moment(taskModel.createdAt).format(DATETIME_FORMAT);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.updated = moment(taskModel.updatedAt).format(DATETIME_FORMAT);
    }
}

export default TaskDto;

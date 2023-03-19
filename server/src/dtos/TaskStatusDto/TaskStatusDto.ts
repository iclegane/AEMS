import {ITaskStatusDocument} from '../../models/task/status/types';


class TaskStatusDto {
    id;

    name;

    constructor(TaskStatusModel: ITaskStatusDocument) {
        this.id = TaskStatusModel.id as string;
        this.name = TaskStatusModel.name;
    }
}

export default TaskStatusDto;

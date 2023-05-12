import TaskStatusModel from '../../models/task/status/TaskStatusModel.js';
import TaskStatusDto from '../../dtos/TaskStatusDto/TaskStatusDto.js';


class TaskStatusService {
    async list(): Promise<TaskStatusDto[]> {
            
       const statuses = await TaskStatusModel.find();
        
       return statuses.map((status) => new TaskStatusDto(status));
    }
}

export default new TaskStatusService();

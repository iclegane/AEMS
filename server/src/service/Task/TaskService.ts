import {Types} from 'mongoose';
import TaskModel from '../../models/task/TaskModel.js';
import TaskStatusModel from '../../models/task/status/TaskStatusModel.js';
import UserModel from '../../models/user/UserModel.js';
import ApiError from '../../exceptions/ApiError.js';
import {ITaskPopulate} from '../../models/task/types.js';
import {ITaskAddQuery, ITaskDetailResponse, ITaskListQuery, ITaskListResponse, ITaskUpdateQuery} from './types.js';


class TaskService {
    async list(query: ITaskListQuery): Promise<ITaskListResponse>  {
        const {filter = {}, options} = query;

        const tasks = await TaskModel.find(filter)
            .limit(options.limit)
            .skip((options.page - 1) * options.limit)
            .populate<Pick<ITaskPopulate, 'status'>>('statusID', 'id name')
            .populate<Pick<ITaskPopulate, 'manager'>>('managerID', 'id name')
            .populate<Pick<ITaskPopulate, 'performer'>>('performerID', 'id name')
            .exec();

        const count = await TaskModel.count();

        return {
            tasks,
            count,
        };
    }

    async add(query: ITaskAddQuery): Promise<ITaskPopulate> {
        const taskStatus = await TaskStatusModel.findOne({name: 'Инициализация'});
        if (!taskStatus) {
            throw ApiError.BadRequest('Невозможно инициализировать статус задачи');
        }

        const performer = await UserModel.findById(query.performerID);
        if (!performer) {
            throw ApiError.BadRequest('Исполнитель не найден!');
        }

        const task =  await TaskModel.create({
            name: query.name,
            description: query.description,
            deadline: query.deadline,
            body: query.body,
            performerID: performer.id as string,
            managerID: query.managerID,
            statusID: taskStatus.id as string,
        });

        const populateTask = await TaskModel.findById(task.id)
            .populate<Pick<ITaskPopulate, 'status'>>('statusID', 'id name')
            .populate<Pick<ITaskPopulate, 'manager'>>('managerID', 'id name')
            .populate<Pick<ITaskPopulate, 'performer'>>('performerID', 'id name');
        if (!populateTask) {
            throw ApiError.BadRequest('Задача не сформирована');
        }

        return populateTask;
    }

    async update(query: ITaskUpdateQuery): Promise<ITaskPopulate> {
        const task = await TaskModel.findById(query.taskID);
        if (!task) {
            throw ApiError.BadRequest('Task not found');
        }

        if (query.fields.statusID) {
            const status = await TaskStatusModel.findById(query.fields.statusID);
            if (!status) {
                throw ApiError.BadRequest('Status not found');
            }
        }

        const updatedData = await TaskModel.findByIdAndUpdate({_id: query.taskID}, query.fields,{
            strict: true,
            new: true,
        })
            .populate<Pick<ITaskPopulate, 'status'>>('statusID', 'id name')
            .populate<Pick<ITaskPopulate, 'manager'>>('managerID', 'id name')
            .populate<Pick<ITaskPopulate, 'performer'>>('performerID', 'id name');
        if (!updatedData) {
            throw ApiError.BadRequest('Update error');
        }

        return updatedData;
    }

    async detail(id: string): Promise<ITaskDetailResponse | null> {
        const taskID = new Types.ObjectId(id);
        return TaskModel.findById(taskID)
            .populate<Pick<ITaskPopulate, 'status'>>('statusID', 'id name')
            .populate<Pick<ITaskPopulate, 'manager'>>('managerID', 'id name')
            .populate<Pick<ITaskPopulate, 'performer'>>('performerID', 'id name');
    }
}

export default new TaskService();

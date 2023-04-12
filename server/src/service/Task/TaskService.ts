import {SortOrder, Types} from 'mongoose';
import TaskModel from '../../models/task/TaskModel.js';
import TaskStatusModel from '../../models/task/status/TaskStatusModel.js';
import UserModel from '../../models/user/UserModel.js';
import ApiError from '../../exceptions/ApiError.js';
import {ITaskPopulate} from '../../models/task/types.js';
import {ITaskAddQuery, ITaskListQuery, ITaskListResponse, ITaskUpdateQuery} from './types.js';
import TaskDto from '../../dtos/TaskDto/TaskDto.js';


class TaskService {
    async list(query: ITaskListQuery): Promise<ITaskListResponse> {
        const {filter = {}, options} = query;

        const statusNames = (filter.status?.length && filter.status);
        const statusIds = await TaskStatusModel.find({ name: { $in: statusNames } }).distinct('_id');

        const sortArr: [string, SortOrder][] = [];
        if (options.sort && options.sort.field && options.sort.type) {
            sortArr.push([options.sort.field, options.sort.type]);
        }

        const filterData = {
            performerID: filter.performerID,
            ...(filter.status?.length && { statusID: { $in: statusIds } })
        };

        const tasks = await TaskModel.find(filterData)
            .sort(sortArr)
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .populate<{statusID: ITaskPopulate['status']}>('statusID', 'id name')
            .populate<{managerID: ITaskPopulate['manager']}>('managerID', 'id name')
            .populate<{performerID: ITaskPopulate['performer']}>('performerID', 'id name')
            .exec();

        const count = await TaskModel.find(filterData).count().exec();

        return {
            tasks: tasks.map((task) => new TaskDto(task)),
            count,
        };
    }

    async add(query: ITaskAddQuery) {
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

    async update(query: ITaskUpdateQuery): Promise<TaskDto | null> {
        const task = await TaskModel.findById(query.id);
        if (!task) {
            throw ApiError.BadRequest('Task not found');
        }

        if (query.fields.status) {
            const status = await TaskStatusModel.findById(query.fields.status);
            if (!status) {
                throw ApiError.BadRequest('Status not found');
            }
        }

        const updatedData = await TaskModel.findByIdAndUpdate({_id: query.id}, {
            statusID: query.fields.status
        },{
            strict: true,
            new: true,
        })
            .populate<{statusID: ITaskPopulate['status']}>('statusID', 'id name')
            .populate<{managerID: ITaskPopulate['manager']}>('managerID', 'id name')
            .populate<{performerID: ITaskPopulate['performer']}>('performerID', 'id name')
            .exec();
        if (!updatedData) {
            throw ApiError.BadRequest('Update error');
        }

        return  new TaskDto(updatedData);
    }

    async detail(id: string): Promise<TaskDto | null> {
        const taskID = new Types.ObjectId(id);
        const task = await TaskModel.findById({_id: taskID})
            .populate<{statusID: ITaskPopulate['status']}>('statusID', 'id name')
            .populate<{managerID: ITaskPopulate['manager']}>('managerID', 'id name')
            .populate<{performerID: ITaskPopulate['performer']}>('performerID', 'id name')
            .exec();
        if (!task) throw ApiError.BadRequest('task not found');

        return new TaskDto(task);
    }
}

export default new TaskService();

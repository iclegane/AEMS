import {NextFunction, Request, Response} from 'express';
import TaskService from '../service/Task/TaskService.js';
import ApiError from '../exceptions/ApiError.js';
import {ITaskAddQuery, ITaskListQuery, ITaskUpdateQuery} from '../service/Task/types.js';
import {SortTypes} from '../types/sort.js';


class TaskController {
    list = async (req: Request<never, never, ITaskListQuery>, res: Response, next: NextFunction) => {
        const { page = 1, limit = 10, sortField = 'name', sortType = 'asc' } = req.query;

        try {
            const data = await TaskService.list({
                filter: {},
                options: {
                    page: Number(page),
                    limit: Number(limit),
                    sortField: String(sortField),
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    sortType: String(sortType) as SortTypes,
                }
            });

            const totalPage = Math.ceil(data.count / Number(limit));

            const total = {
                tasks: data.tasks,
                totalPage,
                page: Number(page),
                count: data.count
            };

            res.json(total);
        } catch (e) {
            next(e);
        }
    };

    detail = async (req: Request<never, never, { id: string }>, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            if (!id) {
                throw ApiError.BadRequest('ID not found');
            }

            const taskData = await TaskService.detail(id);

            res.json(taskData);
        } catch (e) {
            next(e);
        }
    };

    add = async (req: Request<never, never, ITaskAddQuery>, res: Response, next: NextFunction) => {
        try {
            const {managerID, performerID, deadline, name, description, body} = req.body;

            const task = await TaskService.add({
                managerID,
                performerID,
                deadline,
                body,
                name,
                description,
            });

            res.json(task);
        } catch(error: unknown) {
            next(error);
        }
    };

    update = async (req: Request<never, never, ITaskUpdateQuery>, res: Response, next: NextFunction) => {
        try {
            const {taskID, fields} = req.body;

            const task = await TaskService.update({
                taskID,
                fields
            });

            res.json(task);
        } catch(e) {
            next(e);
        }
    };
}

export default new TaskController();

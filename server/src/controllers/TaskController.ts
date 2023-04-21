import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import TaskService from '../service/Task/TaskService.js';
import ApiError from '../exceptions/ApiError.js';
import {
    ITaskAddQuery,
    ITaskListFilter,
    ITaskListParams,
    ITaskUpdateQuery,
    Sort
} from '../service/Task/types.js';
import io from '../index.js';
import { TasksDetailSchema, TasksListSchema, TasksUpdateSchema } from '../utils/validations.js';


class TaskController {
    list = async (req: Request<never, never, ITaskListParams>, res: Response, next: NextFunction) => {
        try {
            const user = req.user!;

            const { page = 1, limit = 10, sortJson = '{}', filterJson = '{}' } = await TasksListSchema.validate(req.query, { abortEarly: false });

            const parsedSort = JSON.parse(sortJson ) as Sort;
            const parsedFilter = JSON.parse(filterJson ) as ITaskListFilter;

            const { count, tasks } = await TaskService.list({
                filter: {
                    performer: user.id,
                    ...parsedFilter,
                },
                options: {
                    page,
                    limit,
                    sort: parsedSort,
                },
            });

            const totalPage = Math.ceil(count / limit);

            const total = {
                tasks,
                totalPage,
                page,
                count,
            };

            res.json(total);
        } catch (error) {
            next(error);
        }
    };

    detail = async (req: Request<never, never, { id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = await TasksDetailSchema.validate(req.params, { abortEarly: false });

            const taskData = await TaskService.detail(id);

            res.json(taskData);
        } catch (e) {
            next(e);
        }
    };

    add = async (req: Request<never, never, ITaskAddQuery>, res: Response, next: NextFunction) => {
        try {
            const { managerID, performerID, deadline, name, description, body } = req.body;

            const task = await TaskService.add({
                managerID,
                performerID,
                deadline,
                body,
                name,
                description,
            });

            io.to(`performer-${performerID}`).emit('createTask', name);

            res.json(task);
        } catch(error: unknown) {
            next(error);
        }
    };

    update = async (req: Request<ParamsDictionary, any, ITaskUpdateQuery>, res: Response, next: NextFunction) => {
        try {
            const { id, status } = await TasksUpdateSchema.validate({
                id: req.params.id,
                status: req.body.status
            }, { abortEarly: false });

            const task = await TaskService.update({
                id,
                status: status ?? undefined,
            });

            res.json(task);
        } catch(e) {
            next(e);
        }
    };
}

export default new TaskController();

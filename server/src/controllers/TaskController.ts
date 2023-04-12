import {NextFunction, Request, Response} from 'express';
import TaskService from '../service/Task/TaskService.js';
import ApiError from '../exceptions/ApiError.js';
import {
    ITaskAddQuery,
    ITaskListFilter,
    ITaskListParams,
    ITaskUpdateQuery,
    Sort
} from '../service/Task/types.js';
import TokenService from '../service/TokenService.js';
import io from '../index.js';


class TaskController {
    list = async (req: Request<never, never, ITaskListParams>, res: Response, next: NextFunction) => {
        const {
            page = 1,
            limit = 10,
            sortJson = '{}',
            filterJson = '{}'
        } = req.query;

        try {
            const {refreshToken} = req.cookies as { refreshToken?: string };
            const userDto = TokenService.validateRefreshToken(refreshToken || '');
            if (!userDto)  throw ApiError.BadRequest('Token is not valid');

            const parsedSort = JSON.parse(sortJson as string) as Sort;
            const parsedFilter = JSON.parse(filterJson as string) as ITaskListFilter;

            const { count, tasks } = await TaskService.list({
                filter: {
                    performerID: userDto.id,
                    ...parsedFilter,
                },
                options: {
                    page: Number(page),
                    limit: Number(limit),
                    sort: parsedSort,
                },
            });

            const totalPage = Math.ceil(count / Number(limit));

            const total = {
                tasks,
                totalPage,
                page: Number(page),
                count,
            };

            res.json(total);
        } catch (error) {
            next(error);
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

            io.to(`performer-${performerID}`).emit('createTask', name);

            res.json(task);
        } catch(error: unknown) {
            next(error);
        }
    };

    update = async (req: Request<never, never, ITaskUpdateQuery>, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;

            const task = await TaskService.update({
                id,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                fields: {...req.body}
            });

            res.json(task);
        } catch(e) {
            next(e);
        }
    };
}

export default new TaskController();

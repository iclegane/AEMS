import {NextFunction, Request, Response} from 'express';
import TaskStatusService from '../service/Status/TaskStatusService.js';


class TaskStatusController {

    list = async (req: Request<never, never, unknown>, res: Response, next: NextFunction) => {
        try {
            const list = await TaskStatusService.list();

            res.json(list);
        } catch (e) {
            next(e);
        }
    };
}

export default new TaskStatusController();

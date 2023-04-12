import {NextFunction, Request, Response} from 'express';
import UndergroundService from '../service/Underground/UndergroundService.js';


class UndergroundController {
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await UndergroundService.list();

            res.json(list);
        } catch (e) {
            console.log(e);
        }
    };
}

export default new UndergroundController();

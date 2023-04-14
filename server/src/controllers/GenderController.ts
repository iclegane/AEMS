import {NextFunction, Request, Response} from 'express';
import GenderService from '../service/Gender/GenderService.js';
 

class GenderController {
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genders = await GenderService.list();
 
            res.json(genders);
        } catch (e) {
            next(e);
        }
    };
}

export default new GenderController();

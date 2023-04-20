import {NextFunction, Request, Response} from 'express';


class VacationController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { start, end } = req.params;


            res.json({});
        } catch (e) {
            next(e);
        }
    }
}

export default new VacationController();
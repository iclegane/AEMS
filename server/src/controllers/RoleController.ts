import { NextFunction, Request, Response } from 'express';
import RoleService from '../service/Role/RoleService.js';


class RoleController {
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roles = await RoleService.list();

            res.json(roles);
        } catch (e) {
            console.log(e);
        }
    };
}

export default new RoleController();

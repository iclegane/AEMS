import {NextFunction, Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';
import UserAdminService from '../service/UserAdmin/UserAdminService.js';


class UserAdminController {

    getAllUsers = () => {};

    getUserById = async (req: Request<never, never, { id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            if (!id) throw ApiError.BadRequest('ID not found');

            const user = await UserAdminService.getUserByID(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    createUser = () => {};

    updateUser = () => {};

    deleteUser = () => {};
}

export default new UserAdminController();

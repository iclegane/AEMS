import {NextFunction, Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';
import UserAdminService from '../service/UserAdmin/UserAdminService.js';
import {UserAdminUpdateSchema} from '../utils/validations.js';
import {IUpdateUserRequestData} from '../types/IUserApi';


 
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

    updateUserById = async (
        req: Request<{ id: string }, never, { data: IUpdateUserRequestData }>,
        res: Response,
        next: NextFunction) => {
        try {
            const { id } = req.params;
            const { data } = req.body;

            const update = await UserAdminUpdateSchema.validate(data);

            const user = await UserAdminService.updateUserByID(id, update);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    deleteUser = () => {};
}

export default new UserAdminController();

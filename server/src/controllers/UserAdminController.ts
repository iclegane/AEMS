import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import UserAdminService from '../service/UserAdmin/UserAdminService.js';
import {UserAdminCreateSchema, UserAdminGetSchema, UserAdminUpdateSchema} from '../utils/validations.js';
import {ICreateUserRequestData, IUpdateUserRequestData} from '../types/IUserApi';



class UserAdminController {

    getAllUsers = () => {};

    getUserById = async (req: Request<never, never, { id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const { userID } = await UserAdminGetSchema.validate({
                userID : id
            });

            const user = await UserAdminService.getUserByID(userID);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

    createUser = async (req: Request<never, never, { data: ICreateUserRequestData }>, res: Response, next: NextFunction) => {
        try {
            const {data} = req.body;

            const createData = await UserAdminCreateSchema.validate(data);

            const hashPassword = await bcrypt.hash(data.password, 4).catch((err: Error) => {
                throw new Error(`Error hashing password: ${err.message}`);
            });

            const user = await UserAdminService.createUser({
                ...createData,
                password: hashPassword,
            });

            res.json(user);
        } catch (e) {
            next(e);
        }
    };

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

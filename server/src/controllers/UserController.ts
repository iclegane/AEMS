import {NextFunction, Request, Response} from 'express';
import UserService from '../service/User/UserService.js';



interface User {
    name: string;
    email: string;
    role: string;
    post: string;
    password: string;
}

interface UserRequest extends Request {
    body: User;
}

class UserController {
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await UserService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    };

    add = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const {name, email, role, post, password} = req.body;

            const user = await UserService.addUser(name, email, password, role, post);

            res.json(user);
        } catch (e) {
            next(e);
        }
    };
}

export default new UserController();

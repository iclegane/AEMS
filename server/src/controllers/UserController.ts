import { NextFunction, Request, Response } from 'express';
import UserService from '../service/User/UserService.js';


interface User {
    name: string;
    email: string;
    role: string;
    post: string;
    password: string;
    skills: string[];
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
}

export default new UserController();

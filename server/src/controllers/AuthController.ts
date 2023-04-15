import {Response, Request, NextFunction} from 'express';
import UserService from '../service/AuthService.js';


export interface IAuthQuery {
    email: string;
    password: string;
}

class AuthController {
    login = async (req: Request<never, never, IAuthQuery>, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }

        return undefined;
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {refreshToken} = req.cookies;

            const token = await UserService.logout(refreshToken as string);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (error) {
            next(error);
        }

        return undefined;
    };

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken as string);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }

        return undefined;
    };
}

export default new AuthController();

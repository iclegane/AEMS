import { Response, Request, NextFunction } from 'express';
import UserService from '../service/AuthService.js';
import { AuthLoginSchema } from '../utils/validations.js';
import { IAuthRequest } from '../types/IAuthApi';
import { RequestWithCookie } from '../types/IRequest';


class AuthController {
    login = async (req: Request<never, never, IAuthRequest>, res: Response, next: NextFunction) => {
        try {
            const { email, password } = await AuthLoginSchema.validate(req.body, { abortEarly: false });
            
            const userData = await UserService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json(userData);
        } catch (error) {
            next(error);
        }
    };

    logout = async (req: RequestWithCookie, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;

            const token = await UserService.logout(refreshToken as string);
            res.clearCookie('refreshToken');

            res.json(token);
        } catch (error) {
            next(error);
        }
    };

    refresh = async (req: RequestWithCookie, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken as string);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json(userData);
        } catch (error) {
            next(error);
        }
    };
}

export default new AuthController();

import {NextFunction, Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';
import TokenService from '../service/TokenService.js';


const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.user = userData;

        next();
    } catch {
        return next(ApiError.UnauthorizedError());
    }

    return undefined;
};

export default AuthMiddleware;

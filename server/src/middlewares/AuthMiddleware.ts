import { NextFunction, Request, Response, RequestHandler } from 'express';
import { IUserDto } from 'src/dtos/UserDto.js';
import ApiError from '../exceptions/ApiError.js';
import TokenService from '../service/TokenService.js';


// todo: replace
declare global {
    namespace Express {
      interface Request {
        user?: IUserDto;
      }
    }
  }

const AuthMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
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

        req.user = userData;

        next();
    } catch {
        return next(ApiError.UnauthorizedError());
    }

    return undefined;
};

export default AuthMiddleware;

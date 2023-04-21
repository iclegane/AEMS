import { Request } from 'express';
import { IUserDto } from '../dtos/UserDto.js';


export interface RequestWithCookie extends Request {
    cookies: {
        refreshToken?: string;
    };
}

export interface RequestWithUser extends Request {
    user?: IUserDto;
}

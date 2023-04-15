import { Request } from 'express';


export interface RequestWithCookie extends Request {
    cookies: {
        refreshToken?: string;
    };
}

import {Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';


export default function errorMiddleware (err: unknown, req: Request, res: Response) {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }

    return res.status(500).json({
        message: 'Server error'
    });
}

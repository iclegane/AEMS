import { Request, Response } from 'express';
import * as Yup from 'yup';
import ApiError from '../exceptions/ApiError.js';


export default function errorMiddleware (err: Error, req: Request, res: Response) {
    console.log(err);

    if (err instanceof ApiError) {
        const errorResponse = {
            message: err.message,
            status: err.status,
            errors: err.errors || [],
        };

        return res.status(err.status).json(errorResponse);
    }

    if (err instanceof Yup.ValidationError) {
        const errors = err.inner.map((e) => ({ field: e.path, message: e.message }));

        return res.status(400).json({ error: 'Validation error', errors });
    }

    const errorResponse = {
        message: 'Server error',
        status: 500,
    };

    return res.status(500).json(errorResponse);
}

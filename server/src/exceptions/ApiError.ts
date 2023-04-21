import { ValidationError } from 'yup';


class ApiError extends Error {
    status: number;

    errors: ValidationError[];

    timestamp: Date;

    constructor(status: number, message: string, errors: ValidationError[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.timestamp = new Date();
    }

    static UnauthorizedError(): ApiError {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static BadRequest(message: string, errors: ValidationError[] = []): ApiError {
        return new ApiError(400, message, errors);
    }

    static NotFound(message: string, errors: ValidationError[] = []): ApiError {
        return new ApiError(404, message, errors);
    }

    static InternalServer(message: string, errors: ValidationError[] = []): ApiError {
        return new ApiError(500, message, errors);
    }

    static FromError(error: Error): ApiError {
        return new ApiError(500, error.message);
    }

    logError() {
        console.error(`${this.timestamp.toISOString()} - ${this.message}`);
        console.error(this.errors);
    }
}

export default ApiError;

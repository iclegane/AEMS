import {Types} from 'mongoose';
import {IUserDocument} from '../models/user/types';


export interface IUserDto {
    id: Types.ObjectId;
    email: string;
    role: Types.ObjectId;
    post: Types.ObjectId | null;
    isActivated: boolean;
}

class UserDto {
    id;

    email;

    role;

    post;

    isActivated;

    constructor(model: IUserDocument) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,no-underscore-dangle
        this.id = model._id;
        this.role = model.role_id;
        this.email = model.email;
        this.post = model.post_id;
        this.isActivated = model.isActivated;
    }
}

export default UserDto;

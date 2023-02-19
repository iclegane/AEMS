import {IUserDocument} from "../models/user/types";
import {Types} from "mongoose";

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
        this.id = model._id;
        this.role = model.role_id;
        this.email = model.email;
        this.post = model.post_id;
        this.isActivated = model.isActivated;
    }
}

export default UserDto;

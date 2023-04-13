import {IUserDocument, IUserPopulated} from '../models/user/types';
import {IRoleDocument} from '../models/role/types';
import {IPostDocument} from '../models/post/types';
import {Replace} from '../types/utils';


export interface IUserDto {
    id: string;
    name: IUserDocument['name'];
    email: IUserDocument['email'];
    role: IRoleDocument['name'];
    post: IPostDocument['name'] | null;
}

type UserDtoPopulated = Replace<IUserDocument, {
    role_id: IUserPopulated['role_id'];
    post: IUserPopulated['post'];
}>

class UserDto {
    id;

    name;

    email;

    role;

    post;

    constructor(model: UserDtoPopulated) {
        this.id = model.id as string;
        this.name = model.name;
        this.email = model.email;
        this.role = model.role_id.name;
        this.post = model.post?.name ? model.post.name : null;
    }
}

export default UserDto;

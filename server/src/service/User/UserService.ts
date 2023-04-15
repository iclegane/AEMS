import UserDto from '../../dtos/UserDto.js';
import UserModel from '../../models/user/UserModel.js';
import {IRoleDocument} from '../../models/role/types.js';
import RoleModel from '../../models/role/RoleModel.js';
import {IPostDocument} from '../../models/post/types.js';
import PostModel from '../../models/post/PostModel.js';
import ApiError from '../../exceptions/ApiError.js';


class UserService {
    async getAllUsers(): Promise<UserDto[]> {
         const users = await UserModel.find()
             .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
             .populate<{post: IPostDocument}>({path: 'post', model: PostModel}).exec();

        if (!users.length) {
            return [];
        }

        return users.map((user) => new UserDto(user));
    }

    async getUserById(id: string): Promise<UserDto> {
        const user = await UserModel.findById(id)
            .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
            .populate<{post: IPostDocument}>({path: 'post', model: PostModel}).exec();
        if (!user) throw ApiError.BadRequest('User not found');

        return new UserDto(user);
    }
}

export default new UserService();

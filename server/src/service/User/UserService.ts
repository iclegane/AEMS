import bcrypt from 'bcrypt';
import UserDto from '../../dtos/UserDto.js';
import UserModel from '../../models/user/UserModel.js';
import {IRoleDocument} from '../../models/role/types.js';
import RoleModel from '../../models/role/RoleModel.js';
import {IPostDocument} from '../../models/post/types.js';
import PostModel from '../../models/post/PostModel.js';
import ApiError from '../../exceptions/ApiError.js';
import SkillModel from '../../models/skill/SkillModel.js';


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

    async addUser(name: string, email: string, password: string, role: string, post: string, skills: string[]) {
        const candidate = await UserModel.findOne({email}).exec();
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email - ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 4).catch((err: Error) => {
            throw new Error(`Error hashing password: ${err.message}`);
        });

        if (role === 'Admin') {
            throw ApiError.BadRequest('Cannot create user with Admin role');
        }

        const roleObj = await RoleModel.findOne({ name: role });
        if (!roleObj) {
            throw ApiError.BadRequest(`Role not found: ${role}`);
        }

        const postObj = await PostModel.findById(post);
        if (!postObj) {
            throw ApiError.BadRequest(`Post not found: ${post}`);
        }        
        
        const skillsObj = await SkillModel.find({ _id: { $in: skills } });
        if (!skillsObj.length) {
            throw ApiError.BadRequest(`Skills not found: ${post}`);
        }

        const update = {
            email,
            name,
            post,
            password: hashPassword,
            role_id: roleObj.id as string,
            skill: skills,
        };

        const options = { upsert: true, new: true };
        const createdUser = await UserModel.findOneAndUpdate({ email }, update, options);

        if (!createdUser) {
            throw new Error(`Failed to create user with email: ${email}`);
        }

        const userDto = this.getUserById(createdUser.id as string);

        return userDto;
    }
}

export default new UserService();

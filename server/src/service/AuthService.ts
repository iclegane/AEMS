import bcrypt from 'bcrypt';
import { Query } from 'mongoose';
import { DeleteResult } from 'mongodb';
import UserModel from '../models/user/UserModel.js';
import TokenService from '../service/TokenService.js';
import UserDto from '../dtos/UserDto.js';
import RoleModel from '../models/role/RoleModel.js';
import ApiError from '../exceptions/ApiError.js';
import PostModel from '../models/post/PostModel.js';
import { IRoleDocument } from '../models/role/types.js';
import { IPostDocument } from '../models/post/types.js';
import AuthDto from '../dtos/AuthDto/AuthDto.js';


class AuthService {
    async login(email: string, password: string): Promise<AuthDto> {
        const user = await UserModel.findOne({ email })
            .populate<{role_id: IRoleDocument}>({ path: 'role_id', model: RoleModel })
            .populate<{post: IPostDocument}>({ path: 'post', model: PostModel }).exec();
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const { accessToken, refreshToken } = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(user.id as string, refreshToken);

        return new AuthDto(accessToken, refreshToken, userDto);
    }

    async logout(refreshToken: string): Promise<Query<DeleteResult, any>> {
        return TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string): Promise<AuthDto> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!tokenFromDb || !userData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id)
            .populate<{role_id: IRoleDocument}>({ path: 'role_id', model: RoleModel })
            .populate<{post: IPostDocument}>({ path: 'post', model: PostModel }).exec();
        if (!user) {
            throw ApiError.UnauthorizedError();
        }

        const userDto = new UserDto(user);
        const { accessToken } = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(user.id as string, refreshToken);

        return new AuthDto(accessToken, refreshToken, userDto);
    }
}

export default new AuthService();

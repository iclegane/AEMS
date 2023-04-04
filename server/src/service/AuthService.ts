import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {Query} from 'mongoose';
import {DeleteResult} from 'mongodb';
import UserModel from '../models/user/UserModel.js';
import TokenService from '../service/TokenService.js';
import UserDto, {IUserDto} from '../dtos/UserDto.js';
import RoleModel from '../models/role/RoleModel.js';
import ApiError from '../exceptions/ApiError.js';
import PostModel from '../models/post/PostModel.js';
import {IRoleDocument} from '../models/role/types.js';
import {IPostDocument} from '../models/post/types.js';


export interface IUserDataResponse {
    accessToken: string;
    refreshToken: string;
    user: IUserDto;
}

class AuthService {
    async registration(email: string, password: string): Promise<IUserDataResponse> {
        const candidate = await UserModel.findOne({email}).exec();
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email - ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 4);
        const emailActivationLinkID = uuidv4();

        const roleID = await RoleModel.findOne({name: 'User'}).exec();
        if (!roleID) throw ApiError.BadRequest('Need add role');

        const create = await UserModel.create({
            email,
            password: hashPassword,
            role_id: roleID,
            emailActivationLink: emailActivationLinkID
        });
        const user = await UserModel.findById(create.id)
            .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
            .populate<{post_id: IPostDocument}>({path: 'post_id', model: PostModel}).exec();
        if (!user) throw ApiError.BadRequest('Create error');

        // todo: add mail service
        // const emailActivationLink = `${process.env.API_URL}/api/activate/${emailActivationLinkID}`;
        // await MailService.sendActivationMail(email, emailActivationLink);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id as string, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async login(email: string, password: string): Promise<IUserDataResponse> {
        const user = await UserModel.findOne({ email })
            .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
            .populate<{post_id: IPostDocument}>({path: 'post_id', model: PostModel}).exec();
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id as string, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async logout(refreshToken: string): Promise<Query<DeleteResult, any>> {
        return TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string): Promise<IUserDataResponse> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!tokenFromDb || !userData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id)
            .populate<{role_id: IRoleDocument}>({path: 'role_id', model: RoleModel})
            .populate<{post_id: IPostDocument}>({path: 'post_id', model: PostModel}).exec();
        if (!user) {
            throw ApiError.UnauthorizedError();
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id as string, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }
}

export default new AuthService();

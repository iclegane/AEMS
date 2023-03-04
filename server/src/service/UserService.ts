import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import {Query} from 'mongoose';
import {DeleteResult} from 'mongodb';
import UserModel from '../models/user/UserModel.js';
import TokenService from '../service/TokenService.js';
import UserDto, {IUserDto} from '../dtos/UserDto.js';
import RoleModel from '../models/role/RoleModel.js';
import ApiError from '../exceptions/ApiError.js';


export interface IUserDataResponse {
    accessToken: string;
    refreshToken: string;
    user: IUserDto;
}

class UserService {
    async registration(email: string, password: string): Promise<IUserDataResponse> {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email - ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 4);
        const emailActivationLinkID = uuidv4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            role_id: '63e94f358dcc5fc1126630ee',
            emailActivationLink: emailActivationLinkID
        });
        await user.populate({path: 'role_id', model: RoleModel});

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
        const user = await UserModel.findOne({ email }).populate({path: 'role_id', model: RoleModel});
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

        const user = await UserModel.findById(userData.id);
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

export default new UserService();

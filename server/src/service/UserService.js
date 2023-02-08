const UserModel = require('../models/UserModel');
const MailService = require('../service/MailService');
const TokenService = require('../service/TokenService');
const UserDto = require('../dtos/UserDto');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const ApiError = require('../exceptions/ApiError');


class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email});

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email - ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 4);
        const emailActivationLinkID = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            emailActivationLink: emailActivationLinkID
        });

        const emailActivationLink = `${process.env.API_URL}/api/activate/${emailActivationLinkID}`;
        await MailService.sendActivationMail(email, emailActivationLink);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = TokenService.findToken(refreshToken);

        if (!tokenFromDb || !userData) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await UserModel.find();

        return users;
    }
}

module.exports = new UserService();

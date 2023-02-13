const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserModel = require('../models/UserModel');
const UndergroundModel = require('../models/UndergroundModel');
const EmploymentModel = require('../models/EmploymentModel');
const GenderModel = require('../models/GenderModel');
const PostModel = require('../models/PostModel');
const RoleModel = require('../models/RoleModel');
const SkillModel = require('../models/SkillModel');
const MailService = require('./MailService');
const TokenService = require('./TokenService');
const UserDto = require('../dtos/UserDto');
const UserInfoDto = require('../dtos/UserInfoDto');
const ApiError = require('../exceptions/ApiError');


class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email - ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 4);
        const emailActivationLinkID = uuid.v4();

        const user = await UserModel.create({
            email,
            password: hashPassword,
            emailActivationLink: emailActivationLinkID
        })
            await user.populate('role_id', 'name');

        const emailActivationLink = `${process.env.API_URL}/api/activate/${emailActivationLinkID}`;
        await MailService.sendActivationMail(email, emailActivationLink);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
            .populate('role_id', 'name');
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
        };
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
            .populate('role_id', 'name');

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async getAllUsers() {
        return UserModel.find();
    }

    async getUserInfoById(id) {
        const user = await UserModel.findById(id)
            .populate('underground_id', 'name')
            .populate('gender_id', 'name')
            .populate('employment_id', 'name')
            .populate('post_id', 'name')
            .populate('skill_ids', 'name');
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }

        return new UserInfoDto(user);
    }

    async editUser(id, fields) {
        const user = await UserModel.findByIdAndUpdate(id, fields, {new: true});

        return user;
    }
}

module.exports = new UserService();

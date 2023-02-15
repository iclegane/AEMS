const {validationResult} = require('express-validator');
const UserService = require('../service/UserService');
const ApiError = require('../exceptions/ApiError');


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Valid error', errors.array())
                );
            }

            const { email, password } = req.body;
            const userData = await UserService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();

            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserInfo(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await UserService.getUserInfoById(userId);

            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async updateUserInfo(req, res, next) {
        try {
            const userId = req.params.id;
            const updated = await UserService.editUser(userId, req.body);

            return res.json(updated);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();

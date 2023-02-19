import jwt, {JwtPayload} from 'jsonwebtoken'
import TokenModel from '../models/token/TokenModel.js';
import {IUserDto} from "../dtos/UserDto";
import {Document, Query} from "mongoose";
import {ITokenDB} from "../models/token/types";
import {DeleteResult} from "mongodb";


class TokenService {
    generateTokens(payload: IUserDto): {
        accessToken: string;
        refreshToken: string;
    } {

        if (!process.env.JWT_ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET is not installed');
        if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not installed');

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m'
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token: string): IUserDto | null {
        try {
            // todo: fixed process env
            // @ts-ignore
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as IUserDto;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): IUserDto | null {
        try {
            // todo: fixed process env
            // @ts-ignore
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as IUserDto;

            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string): Promise<Document<ITokenDB>> {
        const tokenData = await TokenModel.findOne({user: userId});

        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            return tokenData.save();
        }

        return await TokenModel.create({user: userId, refreshToken});
    }

    // todo: change any type on real
    async removeToken(refreshToken: string):  Promise<Query<DeleteResult, any>> {
        const tokenData = await TokenModel.deleteOne({refreshToken});

        return tokenData;
    }

    async findToken(refreshToken: string): Promise<Query<Document, ITokenDB> | null> {
        const tokenData = await TokenModel.findOne({refreshToken});

        return tokenData;
    }
}

export default new TokenService();

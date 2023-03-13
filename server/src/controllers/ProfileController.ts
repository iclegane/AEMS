import {NextFunction, Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';
import ProfileService from '../service/Profile/ProfileService.js';
import TokenService from '../service/TokenService.js';
import {IUpdateProfileRequest} from '../service/Profile/types';
import {ProfilePersonalSchema} from '../utils/validations.js';


class ProfileController {
    getProfileInfo = async (req: Request<never, never, never>, res: Response, next: NextFunction) => {
        try {
            const {refreshToken} = req.cookies as {refreshToken: string | undefined};
            if (!refreshToken) throw ApiError.BadRequest('Token not found');

            const userData = TokenService.validateRefreshToken(refreshToken);
            if (!userData) throw ApiError.BadRequest('User id is empty');

            const {id} = userData;
            const info = await ProfileService.getProfileData(id);

            res.json(info);
        } catch (error) {
            next(error);
        }
    };

    updateProfileInfo = async (req: Request<never, never, {data: IUpdateProfileRequest}>, res: Response, next: NextFunction) => {
        try {
            const {refreshToken} = req.cookies as {refreshToken: string | undefined};
            if (!refreshToken) throw ApiError.BadRequest('Token not found');

            const userData = TokenService.validateRefreshToken(refreshToken);
            if (!userData) throw ApiError.BadRequest('User id is empty');
            const {id} = userData;

            const {data} = req.body;
            if (!data) throw ApiError.BadRequest('Nothing to update');

            await ProfilePersonalSchema.validate({
                ...data.personal,
                ...data.contacts
            });

            await ProfileService.updateProfileData(id, data);

            res.json(id);
        } catch (error) {
            next(error);
        }
    };
};

export default new ProfileController();

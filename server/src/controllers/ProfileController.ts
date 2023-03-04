import {NextFunction, Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';
import ProfileService from '../service/Profile/ProfileService.js';
import TokenService from '../service/TokenService.js';


class ProfileController {
    getProfileInfo = async (req: Request<never, never, {id: string}>, res: Response, next: NextFunction) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {refreshToken} = req.cookies;
            const userData = TokenService.validateRefreshToken(refreshToken as string);
            if (!userData) throw ApiError.BadRequest('User id is empty');

            const {id} = userData;
            const info = await ProfileService.getProfileData(id);

            res.json(info);
        } catch (error) {
            next(error);
        }
    };
};

export default new ProfileController();

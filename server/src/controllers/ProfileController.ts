import {NextFunction, Request, Response} from 'express';
import ApiError from '../exceptions/ApiError.js';
import ProfileService from '../service/Profile/ProfileService.js';
import TokenService from '../service/TokenService.js';
import {IUpdateProfileRequest} from '../service/Profile/types';
import {ProfilePersonalSchema} from '../utils/validations.js';


class ProfileController {
    getProfileInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user!;
 
            const info = await ProfileService.getProfileData(user.id);

            res.json(info);
        } catch (error) {
            next(error);
        }
    };

    updateProfileInfo = async (req: Request<never, never, {data: IUpdateProfileRequest}>, res: Response, next: NextFunction) => {
        try {
            const user = req.user!;
            const {data} = req.body;
            if (!data) throw ApiError.BadRequest('Nothing to update');

            await ProfilePersonalSchema.validate({
                ...data.personal,
                ...data.contacts
            }, {abortEarly: false});
 
            await ProfileService.updateProfileData(user.id, data);

            res.json(user.id);
        } catch (error) {
            next(error);
        }
    };
};

export default new ProfileController();

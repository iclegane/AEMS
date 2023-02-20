import {NextFunction, Request, Response} from 'express';
import UserService from '../service/UserService.js';


class ProfileController {
    getProfileInfo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const userID = req.body.id as string;


            // todo: add user friendly dto
            const user = await UserService.getUserInfoById(userID);

            return res.json(user);
        } catch (error) {
            next(error);
        }

        return undefined;
    };
};

export default new ProfileController();

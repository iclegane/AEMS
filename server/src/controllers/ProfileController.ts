import TokenService from "../service/TokenService.js";
import UserService from "../service/UserService.js";
import {NextFunction, Request, Response} from "express";


class ProfileController {
    async getProfileInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.body.id;
            // todo: add user friendly dto
            const user = await UserService.getUserInfoById(userID);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

export default new ProfileController();

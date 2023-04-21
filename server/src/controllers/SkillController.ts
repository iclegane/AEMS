import { NextFunction, Request, Response } from 'express';
import SkillService from '../service/Skill/SkillService.js';


class SkillController {
    getSkills = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const skills = await SkillService.getAllSkills();
            
            res.json(skills);
        } catch (e) {
            next(e);
        }
    };
}

export default new SkillController();

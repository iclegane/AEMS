import {NextFunction, Request, Response} from 'express';
import PDF, { EPDFTemplateNames } from '../modules/pdf.js';
import { VacationCreateSchema } from '../utils/validations.js';


class VacationController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user!;
 
            const {start, end, days} = await VacationCreateSchema.validate(req.body, {abortEarly: false});

            const templateData = {
                name: user.name,
                start,
                end,
                days,
            }

            const pdf = new PDF(EPDFTemplateNames.VACATION, user.id, templateData);
            const pdf_src = await pdf.create();
 
            res.download(pdf_src, 'document.pdf');
        } catch (e) {
            next(e);
        }
    }
}

export default new VacationController();
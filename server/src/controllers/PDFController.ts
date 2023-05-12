import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


class PDFController {
    getFile = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name } = req.params;
 
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const pdfPath = path.join(__dirname, `../pdf/docs/${name}`);
 
            res.sendFile(pdfPath);
        } catch (e) {
            next(e);
        }
    };
}

export default new PDFController();

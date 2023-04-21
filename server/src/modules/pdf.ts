
import { fileURLToPath } from 'url';
import path from 'path';
import { readFile } from 'fs/promises';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import ApiError from '../exceptions/ApiError.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export enum EPDFTemplateNames {
    VACATION = 'vacation.hbs',
}

class PDF {
    
    name;

    templateData;

    templatePath;

    documentsPath;

    constructor(templateName: EPDFTemplateNames, documentName: string, templateData: any) {
        if (!documentName) {
            throw ApiError.BadRequest('Document name cannot be empty');
        }
    
        if (typeof templateData !== 'object') {
            throw ApiError.BadRequest('Template data must be an object');
        }

        this.name = documentName;
        this.templateData = templateData;
        this.templatePath = path.join(__dirname, '../pdf/templates/', `${templateName}`);
        this.documentsPath = path.join(__dirname, '../pdf/docs/');
    }

    create = async () => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            const htmlTemplate = await readFile(this.templatePath, 'utf8');
    
            const template = handlebars.compile(htmlTemplate);
     
            const html = template(this.templateData);
    
            await page.setContent(html, { waitUntil: 'networkidle0' });
    
            const pdfPath = path.join(this.documentsPath,`${this.name}.pdf`);
    
            await page.pdf({ path: pdfPath, format: 'A4' });
            
            await browser.close();

            return pdfPath;
        } catch(e) {
            throw ApiError.InternalServer('PDF creation failed');
        }
    }
}

export default PDF;
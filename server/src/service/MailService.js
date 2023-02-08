const nodemailer = require('nodemailer');


class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail (to, link) {
        try {
            // await this.transporter.sendMail({
            //     from: process.env.SMTP_USER,
            //     to,
            //     subject: 'Активация аккаунта на сервисе ' + process.env.API_URL,
            //     text: '',
            //     html:
            //         `
            //         <div>
            //             <h1>Активация аккаунта</h1>
            //             <span>Активируйте аккаунт</span>
            //         </div>
            //     `
            // })
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new MailService();

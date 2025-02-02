import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class EmailService {
    private transporter: Transporter;
    configOptions: SMTPTransport.Options = {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT!,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    };
    constructor() {
        this.transporter = nodemailer.createTransport(this.configOptions);
    }
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Активация аккаунта на ${process.env.API_URL}`,
            text: "",
            html: `
                <div>
                    <h1>Для активации пройдите по ссылке</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `,
        });
    }
}

export const emailService = new EmailService();

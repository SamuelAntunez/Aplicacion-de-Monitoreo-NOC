import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachment: Attachment[]

    //todo: attachments
}
interface Attachment {
    filename: string;
    path: string;
}

export class EmailService{ 
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor(
    ) {

    }

    async sendEmail(options: SendMailOptions):Promise<boolean> {

        const {to, subject, htmlBody, attachment = []} = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments: attachment
            })

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'email sent',
                origin: 'email-service.ts'
            })
            

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'email not sent',
                origin: 'email-service.ts'
            })

            return false;
        }
    }
        
    
    async sendEmailWithFileSystemLogs(to: string | string[]) {

        const subject = `logs de sistema - NOC`;
        const htmlBody = `<h3> logs de sistema - NOC </h3>
        
        <p> lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        `;

        const attachment: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachment
        });
}}
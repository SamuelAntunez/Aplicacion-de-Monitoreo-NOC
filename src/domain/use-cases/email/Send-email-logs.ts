import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {


    }

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sendEmail = this.emailService.sendEmailWithFileSystemLogs(to)
            if (!sendEmail) {
                throw new Error('Email log not sent');
            }
            const log = new LogEntity({
                message: 'log email',
                level: LogSeverityLevel.high,
                origin: 'send-log.ts'
            })
            this.logRepository.saveLog(log)

            return true
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.high,
                origin: 'send-log.ts'
            })
            this.logRepository.saveLog(log)
        }
        return true
    }

}
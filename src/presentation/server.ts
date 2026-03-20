import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckServices } from "../domain/use-cases/checks/check-services";
import { CheckServicesMultiple } from "../domain/use-cases/checks/check-services.multiple";
import { SendEmailLogs } from "../domain/use-cases/email/Send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fsLogRepository = new LogRepositoryImpl(
    // new MongoLogDataSource(),
    new FileSystemDatasource(),
    // new PostgresLogDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource(),
    // new FileSystemDatasource(),
    // new PostgresLogDatasource()
)
const pgLogRepository = new LogRepositoryImpl(
    // new MongoLogDataSource(),
    // new FileSystemDatasource(),
    new PostgresLogDatasource()
)

const emailService = new EmailService();


export class Server {

    public static async start(): Promise<void> {
        console.log('Server Started...')


        //! NODE MAILER

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute('samueljoseantunez@gmail.com')

        //! Cron Service
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.goole.com';
        //         new CheckServices(
        //             LogRepository,
        //             () => console.log(`url ${url}`),
        //             (error) => console.error(`Error: url ${url} is not working`)
        //         ).execute(url)
        //     }
        // );

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.goole.com';
                new CheckServicesMultiple(
                    [fsLogRepository, mongoLogRepository, pgLogRepository],
                    () => console.log(`url ${url}`),
                    (error) => console.error(`Error: url ${url} is not working`)
                ).execute(url)
            }
        );

    }
}

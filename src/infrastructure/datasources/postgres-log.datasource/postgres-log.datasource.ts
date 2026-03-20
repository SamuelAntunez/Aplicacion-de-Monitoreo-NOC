import { prisma } from "../../../data/postgres/lib/prisma";
import { LogDatasource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";
import { SeverityLevel } from "../../../generated/enums";

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {


    async saveLog(log: LogEntity): Promise<void> {
        const { message, level, origin, createdAt } = log
        const newLog = await prisma.logModel.create({
            data: {
                message,
                origin,
                createdAt,
                level: severityEnum[level]
            }
        })
        console.log(newLog)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prisma.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        })
        console.log(logs)
        return logs.map( log => LogEntity.fromObject(log))
    }

}
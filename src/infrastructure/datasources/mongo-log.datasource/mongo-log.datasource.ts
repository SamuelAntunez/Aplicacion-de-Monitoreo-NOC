import { LogModel } from "../../../data/mongo";
import { LogDatasource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";


export class MongoLogDataSource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const newLog = await LogModel.create(log)
        await newLog.save();
        console.log(newLog)
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const log = await LogModel.find({
            level: severityLevel
        })
        return log.map( mongoLog => LogEntity.fromObject(mongoLog));
    }
}
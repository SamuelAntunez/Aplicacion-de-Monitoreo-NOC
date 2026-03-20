import { LogDatasource } from "../../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";
import fs from 'fs';


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = "logs/";
    private readonly allLogsPath = "logs/logs-all.log";
    private readonly mediumLogsPath = "logs/logs-medium.log";
    private readonly highLogsPath = "logs/logs-high.log";

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(path)) return
            fs.writeFileSync(path, "")
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logStringify = JSON.stringify(newLog);

        fs.appendFileSync(this.allLogsPath, `${logStringify}\n`)

        if (newLog.level === LogSeverityLevel.low) return

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, `${logStringify}\n`)
            return
        }
        if (newLog.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.highLogsPath, `${logStringify}\n`)
            return
        }
    }
    
    private getLogsFromFile = (path: string): LogEntity[] =>{

        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').filter(log => log !== '').map( log => LogEntity.fromJson(log))
        return logs

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath)
            default:
                throw new Error("Invalid severity level")
        }
    }

}
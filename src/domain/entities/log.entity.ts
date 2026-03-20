import { create } from "domain";

export enum LogSeverityLevel {
    low = 'low', 
    medium = 'medium', 
    high = 'high'
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, createdAt = new Date(), origin } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin
    }

    static fromJson = (json: string):LogEntity =>{
        const {level, message, createdAt, origin}= JSON.parse(json)

        return {
            level,
            message,
            createdAt: new Date(createdAt),
            origin
        }
    }

    static fromObject = ( json: {[key: string]: any}):LogEntity  =>{
        const {message, level, origin, createdAt = new Date()} = json;
        return {
            message,
            level,
            origin,
            createdAt: new Date(createdAt)
        }
    }

}
import { envs } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo/init";
import { LogSeverityLevel } from "./domain/entities/log.entity";
import { MongoLogDataSource } from "./infrastructure/datasources/mongo-log.datasource/mongo-log.datasource";
import { prisma } from "./data/postgres/lib/prisma";
import { Server } from "./presentation/server";

(async() => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    Server.start();



    //! PRISMA 
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'test message',
    //         origin: 'App.ts'
    //     }
    // })
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // })
    // console.log(logs)
}
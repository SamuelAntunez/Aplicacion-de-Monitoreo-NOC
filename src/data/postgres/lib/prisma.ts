import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../../config/plugins/envs.plugins.js";
import { PrismaClient } from "../../../generated/client.js";


const connectionString = `${envs.POSTGRES_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };


import { PrismaClient } from "@prisma/client";

//Create new client if client does not exist
const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== "production") globalThis.prisma = client 

export default client
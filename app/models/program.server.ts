import { prisma } from "~/db.server";


export async function getAllPrograms(){
    return prisma.program.findMany();
}
import { Badge, User } from "@prisma/client";
import { prisma } from "~/db.server";



export async function createBadge({name, pictureUrl, description, userId} : {
    name: Badge["name"];
    pictureUrl: Badge["pictureUrl"];
    description: Badge["description"];
    userId: User["id"];
}){
    
    return await prisma.badge.create({
        data: {
            name,
            pictureUrl,
            description,
            createdById: userId,
        }
    });
}
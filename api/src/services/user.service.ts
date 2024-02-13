import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default class UserService {        
    public create(body: Prisma.UserCreateInput) {
        return prisma.user.create({ data: body })
    }
}
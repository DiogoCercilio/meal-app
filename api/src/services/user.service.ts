import { UserCreateInput } from "../model/user"
import prisma from '../../client'
import BadRequestException from "../exception/badrequest.exception"

export default class UserService {        
    public create(body: UserCreateInput) {
        if(!body.email || !body.name) {
            throw new BadRequestException('"email" and "name" are required') as any
        }
        return prisma.user.create({ data: body })
    }
}
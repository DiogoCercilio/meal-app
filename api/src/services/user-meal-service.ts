import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default class UserMealService {    
    public find(id: number) {
        return prisma.userMeal.findFirst({ where: { id } })
    }
    
    public findAll(userId: number) {
        return prisma.userMeal.findMany({
            where: { userId },
            include: { user: false, meal: true }
        }).then((res: any)=> {
            return res.map((r: any)=> {
                const { name, description, id: mealId, calories, image } = r.meal
              
                return {
                    id: r.id,
                    created: r.createdAt,
                    mealId: mealId,
                    quantity: r.quantity,
                    unitMeasure: r.unitMeasure,
                    image,
                    name,
                    details: r.details,
                    description,
                    calories
                }
            })
        })
    }
    
    public create(body: Prisma.UserMealCreateInput) {
        return prisma.userMeal.create({ data: body })
    }

    public update(id: number, body: Prisma.UserMealCreateInput) {
        return prisma.userMeal.update({ where: { id }, data: body })
    }

    public delete(id: number, userId: number) {
        return prisma.userMeal.delete({ where: { id, userId } })
    }
}
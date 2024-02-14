import prisma from '../../client'
import { MealCreateInput } from '../model/meal'
import { MealCategoryCreateInput } from '../model/meal-category'

export default class MealService {
    public async find(id: number) {
        return await prisma.meal.findUnique({ where: { id } })
    }

    public async findAll(categoryId?: number) {
        const res = categoryId ? 
        await prisma.meal.findMany({ where: { categoryId } }) :
        await prisma.meal.findMany()
        
        return  res
    }

    public async findCategories(id?: number) {
        return await prisma.mealCategory.findMany()
    }

    public async createCategory(mealCategory: MealCategoryCreateInput) {
        return await prisma.mealCategory.create({ data: mealCategory })
    }

    public async create(meal: MealCreateInput) {
        return await prisma.meal.create({ data: meal })
    }
}
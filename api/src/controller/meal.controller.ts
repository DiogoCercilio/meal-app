import express, { Request, Response } from 'express'
import MealService from '../services/meal-service';
const router = express.Router()
const mealService = new MealService()

/**
 * Controler for "/meal" Routes 
 */

/**
 * List All Meals
 */
router.get('/', async (req: Request, res: Response) => {
    const { category } = req.query

    if (category) {
        return res.json(await mealService.findAll(parseInt(category.toString())));
    }
    res.json(await mealService.findAll());
});

/**
 * Create a new Meal
 */
router.post('/', async (req: Request, res: Response) => {
    res.json(await mealService.create(req.body));
});


/**
 * List All Meal categories
 */
router.get('/category', async (req: Request, res: Response) => {
    res.json(await mealService.findCategories());
});

/**
 * Create a new Meal category
 */
router.post('/category', async (req: Request, res: Response) => {
    res.json(await mealService.createCategory(req.body));
});
  
export default router;  
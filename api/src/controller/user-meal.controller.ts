import express, { Request, Response } from 'express'
import UserMealService from '../services/user-meal-service';
import moment from 'moment';
const router = express.Router()
const userMealService = new UserMealService()

const MAX_TIME_IN_MIN_TO_EDIT = 1

/**
 * Controler for "/user-meal" Routes 
 */

/**
 * Finds a specific User Meal
 */
router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.path.replace('/', ''))
    res.json(await userMealService.find(id));
});

/**
 * Finds all User Meals
 */
router.get('/', async (req: Request, res: Response) => {
    if(!req.query.userId) {
        res.status(400)
        res.json({ msg: 'Invalid query param "userId"' })
        return
    }
    const userId: number = parseInt(req.query.userId.toString())
    res.json(await userMealService.findAll(userId));
});

/**
 * Creates a User Meal
 */
router.post('/', async (req: Request, res: Response) => {
    res.json(await userMealService.create(req.body));
});

/**
 * Edit a User Meal, considering the MAX_TIME_IN_MIN_TO_EDIT value
 */
router.put('/', async (req: Request, res: Response) => {
    const current = await userMealService.find(req.body.id)
    
    if(!current?.createdAt) {
        throw new Error(`The given meal was not found`)
    }
    
    const diffFromCreationInMinutes: number = moment(current?.createdAt).diff(moment(), 'minutes');
    const canEdit = (diffFromCreationInMinutes + MAX_TIME_IN_MIN_TO_EDIT) > 0

    if(!canEdit) {
        res.status(400)
        return res.json(`You cannot edit a meal after ${MAX_TIME_IN_MIN_TO_EDIT} minute(s)`)
    }
    res.json(await userMealService.update(req.body.id, req.body));
});

/**
 * Delete a specific User Meal
 */

router.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.path.replace('/', ''))

    if(!id) {
        res.status(400)
        res.json({ msg: 'Invalid query param "id"' })
        return
    }

    if(!req.query.userId) {
        res.status(400)
        res.json({ msg: 'Invalid or Missing user' })
        return
    }
    res.json(await userMealService.delete(id, parseInt(req.query.userId.toString())));
});
  
export default router;  
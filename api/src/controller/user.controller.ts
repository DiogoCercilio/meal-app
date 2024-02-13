import express, { Request, Response } from 'express'
import UserService from '../services/user.service';
const router = express.Router()
const userService = new UserService()

/**
 * Controler for "/user" Routes 
 */

/**
 * Creates a new User
 */
router.post('/', async (req: Request, res: Response) => {
    res.json(await userService.create(req.body));
});
  
export default router;  
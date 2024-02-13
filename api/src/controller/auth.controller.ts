import express, { Request, Response } from 'express'

const router = express.Router()

/**
 * Controler for "/auth" Routes 
 */

router.post('/', async (req: Request, res: Response) => {
    const data = await new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(true)
        }, 2000)
    })
    res.json(data); // Mocked success authentication...
});
  
export default router;  
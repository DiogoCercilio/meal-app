import express, { ErrorRequestHandler } from 'express';
import MealsControllerApi from './controller/meal.controller';
import UserMealControllerApi from './controller/user-meal.controller';
import UserControllerApi from './controller/user.controller';
import AuthControllerApi from './controller/auth.controller';
import { Request, Response, NextFunction } from 'express'
const cors = require('cors');

require('dotenv').config({ path:'.env'})

// Server Config
const app = express();
const options = {
  origin: '*'
}
app.use(cors(options));
app.use(express.json())

// APIs Routes
app.use('/api/meal', MealsControllerApi);
app.use('/api/user-meal', UserMealControllerApi);
app.use('/api/user', UserControllerApi);
app.use('/api/auth', AuthControllerApi);

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction)=> {
  res.status(500)
  res.json('Error')
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

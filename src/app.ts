/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound);
const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to blog project',
  });
};

app.get('/', getAController);

export default app;
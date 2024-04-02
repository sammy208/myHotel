import express, { Request, Response, NextFunction} from'express';
import mongoose from 'mongoose';
import bodyParser from'body-parser';
import dotenv from'dotenv';
import roomTypeRouter from'./routes/roomTypeRouter.ts';
import roomRouter from'./routes/roomRouter.ts';
import {errorHandler} from'./utils/utils.ts';
import apiKeyValidator from'./validations/api-key-validator.ts';
import logger from'./utils/logger.ts';
import userrouter from './routes/userrouter.ts';
import cookieParser from 'cookie-parser';



// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

// CREATING EXPRESS APP
const app = express();


// MIDDLEWARE
app.use(bodyParser.json());

// MIDDLEWARE TO VALIDATE API KEY FOR ALL ROUTES
app.use(apiKeyValidator);

// LOGGER MIDDLEWARE
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
app.use (cookieParser())

// ROUTES
app.use('/api/v1', roomTypeRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/', userrouter)

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// STARTING THE SERVER
const PORT = (process.env.PORT || 5000);
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
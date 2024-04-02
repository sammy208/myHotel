import express, { Request, Response,NextFunction } from "express";
import { defaults } from "joi";

const API_KEY = 'learnable.task.X';

const apiKeyValidator = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key']; 

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export default apiKeyValidator;
import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';

// ASYNC HANDLER FOR EVENTS
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction)=> any) => 
    (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

// ERROR HANDLER
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
};

// OBJECT ID VALIDATOR
export const validateObjectId = (id: string | undefined) => {
    if (!id || typeof id !== 'string') {
      return false;
    }
    return id;
};
export default {asyncHandler, errorHandler, validateObjectId};
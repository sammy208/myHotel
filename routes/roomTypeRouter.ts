import express, { Request, Response, NextFunction } from 'express';
import RoomType from '../models/roomType.ts';
import * as roomTypeController from '../controllers/roomTypeController.ts';
import { asyncHandler } from '../utils/utils';

const router = express.Router();

// Middleware for validating room type data
const validateRoomType = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, capacity, beds, price } = req.body;

  if (!name || !description || !capacity || !beds || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
};

// POST endpoint for creating room types
router.post('/api/v1/room-types', validateRoomType, asyncHandler(roomTypeController.createRoomType));

// GET endpoint for fetching all room types
router.get('/api/v1/room-types', asyncHandler(roomTypeController.getAllRoomTypes));

// GET endpoint for getting a room type by ID
router.get('/api/v1/room-types/:id', asyncHandler(roomTypeController.getRoomTypeById));

// PATCH endpoint for updating a room type by ID
router.patch('/api/v1/room-types/:id', validateRoomType, asyncHandler(roomTypeController.updateRoomTypeById));

// DELETE endpoint for deleting a room type by ID
router.delete('/api/v1/room-types/:id', asyncHandler(roomTypeController.deleteRoomTypeById));

export default router;
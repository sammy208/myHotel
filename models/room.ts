import express, { Request, Response } from 'express';
import roomTypeController from '../controllers/roomTypeController.ts'; 
import { asyncHandler } from '../utils/utils.ts';
import roomTypes from '../models/roomType.ts'

    
const router = express.Router();

// POST endpoint for creating a new room
router.post('/api/v1/rooms', asyncHandler(roomTypeController.createRoomType));

// GET endpoint for fetching all rooms with filters
router.get('/api/v1/rooms', asyncHandler(async (req: Request, res: Response) => {
  let query: any = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }
  if (req.query.roomType) {
    query.roomType = req.query.roomType;
  }
  if (req.query.minPrice) {
    query.price = { $gte: req.query.minPrice };
  }
  if (req.query.maxPrice) {
    if (!query.price) query.price = {};
    query.price.$lte = req.query.maxPrice;
  }

  const rooms = await roomTypes.find(query);
  res.status(200).json({ data: rooms });
}));

// Router GET method for getting a room by id 
router.get('/api/v1/rooms/:id', asyncHandler(roomTypeController.getRoomTypeById));

// Router PATCH method for updating a room 
router.patch('/api/v1/rooms/:id', asyncHandler(roomTypeController.updateRoomTypeById));

// Router DELETE method for deleting a room
router.delete('/api/v1/rooms/:id', asyncHandler(roomTypeController.deleteRoomTypeById));

export default router;
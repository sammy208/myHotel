import express, { Request, Response } from'express';
import {Router} from 'express';
import roomController from'../controllers/roomController';
import { asyncHandler } from'../utils';
import {checkAdminAccess} from'../middleware/authorization.ts'

const router: Router = express.Router();
// POST endpoint to create a new room
router.post('/api/v1/rooms',checkAdminAccess, asyncHandler(roomController.createRoom));

// GET endpoint to fetch all rooms
router.get('/api/v1/rooms', asyncHandler(roomController.getAllRooms));

// GET endpoint to fetch a single room by ID
router.get('/api/v1/rooms/:id', asyncHandler(roomController.getRoomById));

// PATCH endpoint to update a room by ID
router.patch('/api/v1/rooms/:id',checkAdminAccess, asyncHandler(roomController.updateRoomById));

// DELETE endpoint to delete a room by ID
router.delete('/api/v1/rooms/:id',checkAdminAccess, asyncHandler(roomController.deleteRoomById));

export default router
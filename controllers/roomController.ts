import  { Request, Response} from 'express';
import Room from'../models/room.ts';
import RoomTypeModel from '../models/roomType.ts';

interface RoomData {
    name: string;
    roomType: string;
    price: number
}

// Controller functions for managing rooms
const roomController = {
  // Creating rooms
export const createRoom = async (req: Request, res: Response) =>  {
    try {
      const { name, roomType, price } = req.body;
      const newRoom = new Room( name, roomType, price );
      await newRoom.save();
      res.status(201).json({ message: 'Room created successfully', data: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for fetching all rooms
export const getAllRooms = async (req: Request, res: Response) => {
    try {
      const rooms = await RoomTypeModel.find();
      res.status(200).json({ data: rooms });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for fetching a single room by ID
  async getRoomById(req: Request, res: Response) {
    try {
      const room = await RoomTypeModel.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ data: room });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for updating a room by ID
  async updateRoomById(req: Request, res: Response) {
    try {

      const { name, price }: Partial<RoomData> = req.body;
      const updatedRoom = await RoomTypeModel.findByIdAndUpdate(
        req.params.id,
        { name, price },
        { new: true }
      );
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ message: 'Room updated successfully', data: updatedRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for deleting a room by ID
  async deleteRoomById(req: Request, res: Response) {
    try {
      const deletedRoom = await RoomTypeModel.findByIdAndDelete(req.params.id);
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ message: 'Room deleted successfully', data: deletedRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default roomController;
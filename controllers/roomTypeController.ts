import {Request, Response} from 'express';
import RoomType from'./RoomType';


export const createRoomType = async (req: Request, res: Response) => {
  try {
    const { name, description, capacity, beds, price, amenities, image, isAvailable } = req.body;

    if (!name || !description || !capacity || !beds || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newRoomType = new RoomType({ name, description, capacity, beds, price, amenities, image, isAvailable });
    await newRoomType.save();
    
    res.status(201).json({ message: 'Room type created successfully', data: newRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllRoomTypes = async (req:Request, res:Response) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json({ data: roomTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRoomTypeById = async (req: Request, res: Response) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ data: roomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateRoomTypeById = async (req: Request, res: Response) => {
  try {
    const { name, description, capacity, beds, price, amenities, image, isAvailable } = req.body;

    if (!name || !description || !capacity || !beds || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedRoomType = await RoomType.findByIdAndUpdate(
      req.params.id,
      { name, description, capacity, beds, price, amenities, image, isAvailable },
      { new: true }
    );
    
    if (!updatedRoomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ message: 'Room type updated successfully', data: updatedRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRoomTypeById = async (req: Request, res: Response) => {
  try {
    const deletedRoomType = await RoomType.findByIdAndDelete(req.params.id);
    if (!deletedRoomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ message: 'Room type deleted successfully', data: deletedRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default { createRoomType, getAllRoomTypes, getRoomTypeById, updateRoomTypeById, deleteRoomTypeById };
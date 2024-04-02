import RoomTypeModel from '../models/roomType.ts';
import RoomModel from '../models/room.ts';

// Service functions for managing room types
export const roomTypeService = {
  async createRoomType(name: string) {
    const newRoomType = new RoomTypeModel({ name });
    return await newRoomType.save();
  },

  async getAllRoomTypes() {
    return await RoomTypeModel.find();
  },

  async getRoomTypeById(id: string) {
    return await RoomTypeModel.findById(id);
  },

  async updateRoomType(id: string, newName: string) {
    return await RoomTypeModel.findByIdAndUpdate(id, { name: newName }, { new: true });
  },

  async deleteRoomType(id: string) {
    return await RoomTypeModel.findByIdAndDelete(id);
  }
};

// Service functions for managing rooms
export const roomService = {
  async createRoom(name: any, roomType: any, price: any) {
    const newRoom = new RoomModel( name, roomType, price );
    return await newRoom.save();
  },

  async getAllRooms() {
    return await RoomTypeModel.find();
  },

  async getRoomById(id: string) {
    return await RoomTypeModel.findById(id);
  },

  async updateRoom(id: string, newName: string, newPrice: number) {
    return await RoomTypeModel.findByIdAndUpdate(id, { name: newName, price: newPrice }, { new: true });
  },

  async deleteRoom(id: string) {
    return await RoomTypeModel.findByIdAndDelete(id);
  }
};
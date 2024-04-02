import mongoose, { Schema, Document} from'mongoose';
interface RoomType extends Document{
    name:string;
    description?: string;
    capacity?:number;
    beds?:number;
    price:number;
    amenities?: string[];
    isAvailable: boolean;
}

// Defining rooms
const roomTypeSchema: Schema<RoomType> = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  capacity: {
    type: Number
  },
  beds: {
    type: Number
  },
  price: {
    type: Number,
  },
  amenities: {
    type: [String],
    default: []
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

// Creating the RoomType model using the roomTypeSchema
const RoomTypeModel = mongoose.model<RoomType>('RoomType', roomTypeSchema);

export default RoomTypeModel;
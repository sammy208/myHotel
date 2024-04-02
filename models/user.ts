
import mongoose, { Schema, Document} from'mongoose';

interface Iuser extends Document{
    email: string;
    password: string;
    name: string;
    role: "user" | "admin";
}

const userSchema: Schema<Iuser> = new mongoose.Schema({
    
    email: {
        type: String, 
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user",
    }
})

const User = mongoose.model<Iuser>("User", userSchema)
export default User;
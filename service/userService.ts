import User from "../models/user.ts";
import { hashpassword } from "../config/bcryptConfig.ts";

export const saveuser = async (email: string, password: string, name: string, role: string) => {
    try {
        const hashedpassword = await hashpassword(password);
        const newUser = new User({
            email,
            password: hashedpassword,
            name,
            role,
        });
        return await newUser.save();
    } catch (error) {
        console.log("Error occurred while saving a user", error);
    }
};

export const findUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log("Error occurred while finding a user by email", error);
    }
};
import bcrypt from "bcryptjs"
import User from "../model/user.js"

export const hashpassword = async (password: string):Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        return hashedpassword
    }catch(error){
        console.log ("error while harshing password" , error);
        throw error;
    }
    
}
export const comparepassword = async (email: string, password: string)Promise<boolean> => {
    try {
        const user = await User.findOne({email});
        if (!user){
            throw new Error ("User not Found");
        }
        const match = await bcrypt.compare(password, user.password)
        return match
    }catch(error){
        console.log ("error occured while comparing password", error);
        throw error;
    }
}


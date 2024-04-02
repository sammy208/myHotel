import {Request, Response} from 'express';
import {validateSignupInput, validateLoginInput } from "../utils/userutils.ts";
import {saveuser, findUserByEmail} from"../service/userService.ts";
import {comparepassword} from"../config/bcryptConfig.ts";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

export const signUp=async(req: Request,res: Response) =>{
    try{
     const {email,password,name}=req.body
     const inputValidation=  validateSignupInput(email,password,name)
     if(!inputValidation){
        res.status(400).json({message: 'Invalid Input'})
     }
     const exisitingUser= await findUserByEmail(email);
     if(exisitingUser){
        return res.status(400).json({message: 'User already exists'})
     }
     let role= "user";
     const companyEmailRegex = /^[^@\s]+@(?:[^.@\s]+\.)?samuel\.com$/;
      if(companyEmailRegex.test(email)){
          role= "Admin";
      }
    await saveuser(email,password,name,role);
    res.status(200).json({message:"user registered successfully"});
     }catch(error){
        console.log("Error occurred while signup",error);
        console.log(error)
        res.status(500).json({message: "Internal server error", error: error});
     }
}
export const login = async(req: Request, res: Response)  =>{
    try{
       const {email,password}=req.body
       const inputValidation=  validateLoginInput(email,password)
       if(!inputValidation){
          res.status(400).json({message: 'Invalid Input'})
       }
      const result = await comparepassword(email,password)
      if(!result){
      return res.status(400).json({message: 'Invalid password'})
      }
     const payload= {email}
     const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '1h'})
     res.cookie("token", token ,{httpOnly : true})
 return res.status(200).json({message:"user successfully login",token});
    }catch(error){
       console.log("Error occurred while login",error)
       res.status(500).json({message: "Internal server error", error: error});
    }
 }



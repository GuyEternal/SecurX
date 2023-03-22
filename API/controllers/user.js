import User from "../routes/Models/User.js";
import { register } from "./auth.js";

export const createUser= register

export const updateUser= async (req,res,next)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        next(err)
    }
};

export const getUser= async (req,res,next)=>{
    try{
        const FindUser= await User.findById(req.params.id)
        res.status(200).json(FindUser)
    }
    catch(err){
        next(err)
    }
};

export const getallUser= async (req,res,next)=>{
    try{
        const Users= await User.find(req.params.id)
        res.status(200).json(Users)
    }
    catch(err){
       next(err)
    }
};

export const deleteUser= async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
       res.status(200).json("User has been deleted")
   }
   catch(err){
      next(err)
   }
};
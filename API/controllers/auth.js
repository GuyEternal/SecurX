import User from "../routes/Models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";

export const register= async(req,res,next)=>{
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await (req.body.password,salt);
        
        
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        })
        await newUser.save()
        res.status(200).json("User has been created!")
        
    } catch (err) {
        next(err)
        
    }
}
 
export const login= async(req,res,next)=>{
    try {
        const user=await User.findOne({username:req.body.username});
        if(!user) return next(createError(404,"User not found"))

        const isPasswordCorrect=  bcrypt.compare(user.password,req.body.password);
        if (!isPasswordCorrect) return next(createError(400,"Wrong Password!"));
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email
          };
        res.json(user);
        
    
        
          
    } catch (err) {
        next(err)
    }
}



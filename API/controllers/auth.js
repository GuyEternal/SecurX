import User from "../routes/Models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import keyPair from "../routes/keyPair.js";


export const register= async(req,res,next)=>{
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(req.body.password,salt);
        
        const KeyPair = new keyPair();

        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword,
            publicKey: KeyPair.publicKey,
            privateKey:KeyPair.privateKey
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
        const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password);
        if (!isPasswordCorrect) return next(createError(400,"Wrong Password!"));
        res.json(user);
        
    
        
          
    } catch (err) {
        next(err)
    }
}



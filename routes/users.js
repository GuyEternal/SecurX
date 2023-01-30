import  express  from "express";
import User from "./Models/User.js"

const router =express.Router();



//CREATE
router.post("/",async (req,res)=>{
    const newUser= new User(req.body);

    try{
        const savedUser= await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
});
//READ
router.get("/:id",async (req,res)=>{

    try{
        const FindUser= await User.findById(req.params.id)
        res.status(200).json(FindUser)
    }
    catch(err){
        res.status(500).json(err)
    }
});

router.get("/",async (req,res)=>{

    try{
        const Users= await User.find(req.params.id)
        res.status(200).json(Users)
    }
    catch(err){
        res.status(500).json(err)
    }
});
//UPDATE
router.put("/:id",async (req,res)=>{

    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
});
//DELETE
router.delete("/:id",async (req,res)=>{

    try{
         await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
});

export default router;
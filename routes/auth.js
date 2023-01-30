import  express  from "express";

const router =express.Router();

router.get("/",(req,res)=>{
    res.send("Hello this is auth endpoint")
})

router.get("/register",(req,res)=>{
    res.send("Hello this is auth Register endpoint")
})

router.get("/login",(req,res)=>{
    res.send("Hello this is auth Login endpoint")
})

export default router;
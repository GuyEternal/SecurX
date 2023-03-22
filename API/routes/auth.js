import  express  from "express";
import { login, register } from "../controllers/auth.js";
import User from "./Models/User.js";


const router =express.Router();

router.post("/register",register);
router.post("/login",login);




export default router;
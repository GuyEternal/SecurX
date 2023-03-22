import  express  from "express";
import { createUser, deleteUser, getallUser, getUser, updateUser } from "../controllers/user.js";
import User from "./Models/User.js"

const router =express.Router();



//CREATE
router.post("/register",createUser);
//READ
router.get("/:id",getUser);

router.get("/",getallUser);
//UPDATE
router.put("/:id",updateUser);
//DELETE
router.delete("/:id",deleteUser);

export default router;
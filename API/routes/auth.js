import express from "express";
import { checkAuth, login, logout, register } from "../controllers/auth.js";
import User from "./Models/User.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkAuth", checkAuth);
router.get("/logout", logout)

export default router;
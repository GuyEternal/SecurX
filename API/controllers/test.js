
import User from "../routes/Models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import KeyPair from "../utils/keyPair.js";
import { encryptPrivateKey } from "../utils/KeyHandling.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
dotenv.config();

export const test = (req, res) => {
    res.status(200).send({ message: "Ok", success: "true" });
}
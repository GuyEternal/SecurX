
import User from "../routes/Models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import KeyPair from "../utils/keyPair.js";
import { encryptPrivateKey } from "../utils/KeyHandling.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
dotenv.config();

export const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(req.body.password, salt);

        const key = new KeyPair();
        const publicKey = key.publicKey;
        const privateKey = key.privateKey;

        // Encrypt the private key
        const encryptedPrivateKey = encryptPrivateKey(privateKey);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            publicKey: publicKey,
            privateKey: encryptedPrivateKey
        });

        await newUser.save();
        res.status(200).json("User has been created!");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        console.log(req);
        const { username, password } = req.body;
        if (!(username && password)) {
            return res.status(400).send("Please enter all the information");
        }
        const currUser = await User.findOne({ username });
        if (!currUser) {
            return res.status(400).send("User does not exist!");
            // Redirect to register or something
        }
        const hashedPassword = await bcrypt.compare(password, currUser.password).then((match) => {
            if (!match) {
                return res.status(400).send("Invalid credentials");
            }
            // If the password is correct, generate a token:
            console.log(currUser);
            console.log(currUser._id);
            const token = jwt.sign({ id: currUser._id, username, email: currUser.email }, process.env.SECRET_KEY, {
                expiresIn: "1d",
            });
            currUser.token = token;
            currUser.password = undefined;
            // send cookies to the client:
            console.log(token);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: false, // Set to true in production with HTTPS
                sameSite: "Lax" // or remove for local development
            }).status(200).send({ message: "You have successfully logged in!", currUser, token, success: true });
        });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token").send("You have successfully logged out!");
    } catch (error) {
        res.status(500).json({ message: "You ARE NOT logged out due to an internal error!", error: error.message });
    }
}

const verifyCheckAuth = (req, res, token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                console.log("This is the error when token is verified unseucde: ", err);
                reject(new Error("Token verification failed"));
            } else {
                console.log("This is when token is verified successfully:");
                req.userID = payload.id;
                req.username = payload.username;
                resolve();
            }
        });
    });
}

// checkAuth route
export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token; // You need to get the token from the request
        if (!token) {
            return res.status(200).json({ success: false, message: "No token provided" });
        }
        console.log(token, req.userID);
        await verifyCheckAuth(req, res, token);
        return res.status(200).json({
            success: true,
            message: "You are authenticated!",
            userID: req.userID,
            username: req.username
        });
    } catch (error) {
        return res.status(200).json({ success: false, message: "Not authenticated" });
    }
}
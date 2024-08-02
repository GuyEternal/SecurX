import express from "express";
import NodeRSA from 'node-rsa';
import Passwords from "./Models/Passwords.js";
import bcrypt from "bcryptjs";
import User from "./Models/User.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { decryptPrivateKey } from "../utils/KeyHandling.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route for handling user input of login credentials for other websites


router.post('/input/:id', verifyToken, async (req, res) => {
    try {
        const { websiteName, websiteUsername, websitePassword } = req.body;

        // Encrypt the user's login password using the RSA public key
        const userId = req.params.id;
        const user = await User.findById(userId);
        const encryptedPassword = crypto.publicEncrypt(user.publicKey, Buffer.from(websitePassword)).toString('base64');

        // Save the user's login credentials to the database
        const website = new Passwords({
            websiteName,
            websiteUsername,
            websitePassword: encryptedPassword,
            user: user._id,
        });

        await website.save();

        res.status(200).json({ message: 'Login credentials saved successfully', website });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/login-credentials/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        const passwords = await Passwords.find({ user: userId });

        // Decrypt the encrypted passwords using the RSA private key
        const decryptedPrivateKey = decryptPrivateKey(user.privateKey);
        const decryptedPasswords = passwords.map(password => {
            const decryptedPassword = crypto.privateDecrypt(decryptedPrivateKey, Buffer.from(password.websitePassword, 'base64')).toString('utf8');

            return {
                websiteId: password._id,
                websiteName: password.websiteName,
                websiteUsername: password.websiteUsername,
                websitePassword: decryptedPassword,
            };
        });

        res.status(200).json({ passwords: decryptedPasswords });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.post('/show-password', verifyToken, async (req, res) => {
    try {
        const id = req.body.websiteId;
        const website = await Passwords.findById(id);
        const userId = website.user;
        const user = await User.findById(userId);
        const websitePassword = website.websitePassword;

        const decryptedPrivateKey = decryptPrivateKey(user.privateKey);
        const decryptedPassword = crypto.privateDecrypt(decryptedPrivateKey, Buffer.from(websitePassword, 'base64')).toString('utf8');

        res.status(200).json({ websitePassword: decryptedPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Passwords.findByIdAndDelete(id);
        res.status(200).json({ message: 'Website deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete website' });
    }
});

router.put('/edit/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { websiteName, websiteUsername, websitePassword } = req.body;

        // Fetch existing password
        const currentWeb = await Passwords.findById(id);
        const existingPassword = currentWeb.websitePassword;
        if (!existingPassword) {
            return res.status(404).json({ error: 'Password not found' });
        }

        // Fetch user's private key
        const userId = currentWeb.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Decrypt existing password
        const decryptedPrivateKey = decryptPrivateKey(user.privateKey);
        const decryptedPassword = crypto.privateDecrypt(decryptedPrivateKey, Buffer.from(existingPassword, 'base64')).toString('utf8');

        // Update password fields if provided
        if (websiteName) {
            currentWeb.websiteName = websiteName;
        }
        if (websiteUsername) {
            currentWeb.websiteUsername = websiteUsername;
        }

        // Encrypt updated password
        const encryptedPassword = crypto.publicEncrypt(user.publicKey, Buffer.from(websitePassword, 'utf8')).toString('base64');
        if (websitePassword) {
            currentWeb.websitePassword = encryptedPassword;
        }

        // Update password in database
        const updatedPassword = await Passwords.findByIdAndUpdate(id, { websiteName, websiteUsername, websitePassword: encryptedPassword }, { new: true });

        res.status(200).json({ message: 'Website updated successfully', updatedPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update website' });
    }
});

export default router;
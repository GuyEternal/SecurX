import  express  from "express";
import NodeRSA from 'node-rsa';
import Passwords from "./Models/Passwords.js";
import bcrypt from "bcryptjs";
import User from "./Models/User.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const router =express.Router();

// Route for handling user input of login credentials for other websites



router.post('/input/:id', async (req, res) => {
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
      

    res.status(200).json({ message: 'Login credentials saved successfully', website});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/login-credentials/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      const passwords = await Passwords.find({ user: userId}); // assuming the user is authenticated and has an _id field
      
      // Decrypt the encrypted passwords using the RSA private key and the stored email address
      const decryptedPasswords = passwords.map((password) => {
        const decryptedPassword = crypto.privateDecrypt(user.privateKey, Buffer.from(password.websitePassword, 'base64')).toString('utf8');
  
        return {
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


export default router;
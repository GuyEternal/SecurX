import  express  from "express";
import NodeRSA from 'node-rsa';
import Passwords from "./Models/Passwords.js";
import bcrypt from "bcryptjs";
import User from "./Models/User.js";
import crypto from "crypto";


const router =express.Router();
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

// Route for handling user input of login credentials for other websites



router.post('/input/:id', async (req, res) => {
  try {
    const { websiteName, websiteUsername, websitePassword } = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await (websitePassword,salt);

    // Encrypt the user's login password using the RSA public key
    const encryptedPassword = crypto.publicEncrypt(publicKey, Buffer.from(hashedPassword)).toString('base64');
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    
   
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
      const passwords = await Passwords.find({ user: userId}); // assuming the user is authenticated and has an _id field
  
      // Decrypt the encrypted passwords using the RSA private key and the stored email address
      const decryptedPasswords = passwords.map((password) => {
        const decryptedPassword = crypto.privateDecrypt(privateKey, Buffer.from(password.websitePassword, 'base64')).toString('utf8');
  
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
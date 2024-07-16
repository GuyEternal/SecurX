// utils/KeyHandling.js
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Function to encrypt the private key
export const encryptPrivateKey = (privateKey) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encryptedPrivateKey = cipher.update(privateKey, 'utf8', 'hex');
    encryptedPrivateKey += cipher.final('hex');
    return `${iv.toString('hex')}:${encryptedPrivateKey}`;
};

// Function to decrypt the private key
export const decryptPrivateKey = (encryptedPrivateKeyWithIv) => {
    const [iv, encryptedPrivateKey] = encryptedPrivateKeyWithIv.split(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), Buffer.from(iv, 'hex'));
    let decryptedPrivateKey = decipher.update(encryptedPrivateKey, 'hex', 'utf8');
    decryptedPrivateKey += decipher.final('utf8');
    return decryptedPrivateKey;
};

import crypto from 'crypto';
// setting dotenv
import "dotenv/config";

const algorithm="aes-192-cbc";
const key=crypto.scryptSync(process.env.API_TOKEN, 'salt', 24);
const iv = crypto.randomBytes(16);

export function encryption(data){
   const ciphar=crypto.createCipheriv(algorithm, key, iv);
   const encrypted=ciphar.update(data, 'utf8', 'hex') + ciphar.final('hex');
   return encrypted;
}

export function decryption(data){
   const deciphar=crypto.createDecipheriv(algorithm, key, iv);
   const decrypted=deciphar.update(data, 'hex','utf8') + deciphar.final('utf8');
   return decrypted;
}
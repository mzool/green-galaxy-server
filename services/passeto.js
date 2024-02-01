import { V4 } from "paseto";
import fs from "fs";

const privateKeyPath = "privateKey.pem";
const { verify, sign } = V4;
// Function to generate a PASETO token
async function generatePasetoToken(payload, expireInHours, minutes = false) {
    try {
        // Read the private key from the file
        const privateKey = fs.readFileSync(privateKeyPath, "utf-8");

        // Calculate the expiration time
        const expiration = new Date();
        if (!minutes) {
            expiration.setHours(expiration.getHours() + expireInHours);
        } else{
            expiration.setMinutes(expiration.getMinutes() + expireInHours);
        }      
         // Sign the payload with PASETO
        const token = sign({ payload, exp: expiration }, privateKey, { footer: 'green-galaxy-v1' });

        return token;
    } catch (error) {
        console.error("Error generating PASETO token:", error.message);
        return error;
    }
}

// Function to verify a PASETO token
async function verifyPasetoToken(token, publicKey) {
    try {
        const payload = await verify(token, publicKey, { footer: null });
        if (payload) {
            return payload;
        } else {
            return null
        }
    } catch (error) {
        // Token verification failed
        console.error("Token verification failed:", error.message);
        return null;
    }
}

export { generatePasetoToken, verifyPasetoToken };

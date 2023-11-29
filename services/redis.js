import { createClient } from 'redis';
import logger from './winston_logger.js';

async function cash(method, key, value, _t = 5) {
    try {
        if (method !== "set" && method !== "get" && method !== "del") {
            console.log("method error");
            throw new Error("Invalid method. Use 'set' or 'get'.");
        }

        if (!key) {
            console.log("key error");
            throw new Error("Key is required.");
        }

        // Create a Redis client and establish a connection.
        const client = createClient();
        // Handle Redis client errors
        client.on('error', err => {
            logger.error('Redis Client Error', err);
        });

        // Connect to Redis
        await client.connect();
        if (method === "set" && value) {
            // Set a key-value pair in the Redis store with a TTL of 30 seconds
            await client.set(key, value);
            await client.expire(key, _t * 60);
        } else if (method === "get") {
            // Retrieve a value associated with the 'key' from the Redis store
            const storedValue = await client.get(key);
            return storedValue;
        } else if (method === 'del') {
            await client.del(key, (err) => {
                console.log(err);
            })
        } else {
            console.log("err");
            logger.error("Invalid method.");
        }
        // Disconnect the Redis client after operations are complete.
        await client.disconnect();
    } catch (error) {
        logger.error(error.message);
        throw error; // Re-throw the error for upper-level handling
    }
}

export default cash;

import express from "express"
import { Server } from "socket.io"
import http from 'http'
import logger from "../../services/winston_logger.js"
/// create chat app
const chatApp = express();
/// create server attached with chat app
const chatServer = http.createServer(chatApp);
/// create the socket
const io = new Server(chatServer);

async function ChatWithUs(req, res, next) {
    try {

        // Socket.io setup
        io.on('connection', (socket) => {
            console.log('User connected');

            // Handle chat events
            socket.on('chat message', (message) => {
                io.emit('chat message', message); // Broadcast the message to all connected clients
            });

            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
        // Start the server
        const PORT = process.env.chatPort || 4000;
        chatServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        next()
    } catch (err) {
        logger.error(err)
        console.log(err.message);
        return res.status(500).json({ error: "Somthing Error, try again later." })
    }
}
export default ChatWithUs
export { io }
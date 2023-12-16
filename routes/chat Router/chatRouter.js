import express from "express"
import ChatWithUs from "../../contorllers/chat/chatApp.js"
import { io } from "../../contorllers/chat/chatApp.js";
const chatWithUsRouter = express.Router();

chatWithUsRouter.get("/chat", ChatWithUs, (req, res) => {
    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        console.log('User connected to chat');

        // Additional chat logic specific to this namespace...

        socket.on('disconnect', () => {
            console.log('User disconnected from chat');
        });
        return res.status(200).json({message:"connoected"})
    });

});

export default chatWithUsRouter
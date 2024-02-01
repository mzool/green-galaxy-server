import { Server } from "socket.io"
import clientChat from "./clientChat.js";
import adminChat from "./adminChat.js"
function chatWithUs(server) {
    ////create socket io
    const io = new Server(server, {
        cors: {
            origin: process.env.origin
        },
        secure:true
    });
    //// client chat
    clientChat(io)
    /// admin chat
    adminChat(io)

}

export default chatWithUs

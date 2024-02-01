import getUserMessage from "./userChatControllers/getUserMessage.js"
import ChatModel from "../../model/chat/chatModel.js"


function clientChat(io) {
    try {
        /// chat db
        let chatDB;
        let allUsermMessages = [];
        /// get the user on first message he send
        let authUser = false;
        /// create the client socket
        const client = io.of("/client");
        /// when conniction
        client.on("connection", (socket) => {
            socket.emit("welcome", "Welcome to Green Galaxy Chat app!");

            //// get user message 
            socket.on("userMessage", async (msg) => {
                authUser = await getUserMessage(msg, authUser);
                //// if not authUser return
                if (!authUser) { socket.disconnect(true) }
                /// get user past messages
                chatDB = await ChatModel.findOne({ user_id: msg.room });
                /// if not chatdb create one
                if (!chatDB) {
                    chatDB = new ChatModel({
                        user_id: msg.room,
                        messages: []
                    }).save();
                }
                /// push all messages to one array
                allUsermMessages.push({
                    text: msg.text,
                    messageTime: msg.timeStamp,
                });
                /// create room for user and join it
                socket.room = msg.room;
                socket.join(msg.room);
                io.of("/admin").emit("userMessage", msg)
            });
            //// when disconnect
            socket.on("disconnect", async () => {
                chatDB.messages = [...chatDB.messages, ...allUsermMessages];
                await chatDB.save();
                console.log("disconnected");
            })
        })
    } catch (err) {
        console.log(err.message);
    }
}
export default clientChat



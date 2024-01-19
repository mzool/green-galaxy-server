import user from "../../model/users.js";
import ChatModel from "../../model/chat/chatModel.js"
function clientChat(io) {
    try {
        let checker = false;
        let data = {
            user_id: "",
            messages: [],
            past: false
        }
        const client = io.of("/client");
        client.on("connection", (socket) => {
            socket.emit("welcome", "Welcome to Green Galaxy Chat app!");
            //// get user message 
            socket.on("userMessage", async (msg) => {
                //// some of authorization code I do not sure if it neccissarly
                if (!checker) {
                    const user_id = msg.room;
                    const theUser = await user.findOne({ user_id });
                    theUser ? checker = true : null
                    if (!checker) { return console.log("wierd attempt to chat"); }
                }
                //// get the past messages if exist
                const pastChat = await ChatModel.findOne({ user_id: msg.room }).lean();
                if (pastChat) {
                    data.messages = pastChat.messages;
                    data.past = true;
                    io.of("/admin").emit("userMessage", data.messages);
                }
                /// create data for saving to db after disconnecting
                data.user_id = msg.room;
                data.messages.push({ text: msg.text, messageTime: msg.timeStamp })
                //////
                const room = `${msg.name}-${msg.room}`
                io.of("/admin").emit("userMessage", msg);
                socket.join(room);
                io.of("/admin").emit("rooms", room)
            })
            //// when disconnect
            socket.on("disconnect", async () => {
                if (data.past) {
                    await ChatModel.updateOne({ user_id: data.user_id }, { messages: data.messages }, { new: true })

                } else {
                    //// save chat to DB
                    //// save chat for one 1 month 
                    const expireAt = new Date(Date.now() + 1 * 30 * 24 * 60 * 60 * 1000) //// expire after 1 months in milli seconds
                    //// create model 
                    await ChatModel.create({ user_id: data.user_id, messages: data.messages, expireAt })
                }
            })
        })
    } catch (err) {
        console.log(err.message);
    }
}
export default clientChat



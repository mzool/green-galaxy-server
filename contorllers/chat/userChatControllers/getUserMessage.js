import UsersDB from "../../../model/users.js"
import ChatModel from "../../../model/chat/chatModel.js"

async function getUserMessage(msg, authUser) {
    try {
        if (!authUser) {
            const user_id = msg.room;
            const theUser = await UsersDB.findOne({ user_id });
            theUser ? authUser = true : authUser = false;
            if (!authUser) { return console.log("User room not found"); }
        }

        return authUser;
        //// get the past messages if exist
        const pastChat = await ChatModel.findOne({ user_id: msg.room }).lean();
        if (pastChat) {
            // data.messages = pastChat.messages;
            // data.past = true;
            // io.of("/admin").emit("userMessage", data.messages);
            console.log(pastChat);
        }
        /// create data for saving to db after disconnecting
        // data.user_id = msg.room;
        // data.messages.push({ text: msg.text, messageTime: msg.timeStamp })
        //////
        // const room = `${msg.name}-${msg.room}`
        // io.of("/admin").emit("userMessage", msg);
        // socket.join(room);
        // io.of("/admin").emit("rooms", room)
    } catch (err) {
        console.log(err.message);
        return err
    }
}
export default getUserMessage
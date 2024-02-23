function adminChat(io) {
    try {
        const admin = io.of("/admin");
        admin.on("connection", (socket) => {
            socket.emit("welcome", "Welcome to Green Galaxy Chat app!");
            
        });
    } catch (err) {
        console.log(err.message);
    }
}

export default adminChat;
// const rooms = Object.keys(socket.adapter.rooms);
// // Get user message 
// socket.on("userMeslsage", (msg) => {
//     // Join user room
//     socket.join(`${msg.room}`);

//     // Update rooms array for this admin connection
//     if (!rooms.includes(msg.room)) {
//         rooms.push(msg.room);
//     };

//     // Send rooms to all admin connections
//     admin.emit("rooms", rooms);

//     // Send the message to admin interface
//     socket.to(`${msg.room}`).emit("userMessage", msg);
// });
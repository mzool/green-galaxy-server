import mongoose from "mongoose";

function DB(url) {
    try {
        console.log("Connecting to DB...");
        mongoose.connect(url);

        const db = mongoose.connection;

        // Handle connection errors
        db.on('error', (error) => {
            console.error('Database connection error:', error);
        });

        // Handle successful connection
        db.once('open', () => {
            console.log('Connected to DB!');
        });

        // Optionally, handle disconnect events
        db.on('disconnected', () => {
            console.log('Disconnected from DB');
        });

        // Optionally, handle process termination to close the connection gracefully
        process.on('SIGINT', async () => {
            mongoose.connection.close();
            console.log('MongoDB connection closed.');
            process.exit(0);
        });

    } catch (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1); // Exit the process with an error code
    }
}

export default DB;

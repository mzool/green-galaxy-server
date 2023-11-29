import mongoose from "mongoose";
function DB(url) {
    mongoose.connect(url);
    const db = mongoose.connection;
    /// if there is an error with db connection
    db.on('error', (error) => {
        console.error('database connection error: ', error);
    });
    /// when server shutdown let the db connection close
    // process.on('SIGINT', () => {
    //     mongoose.connection.close(() => {
    //         console.log('DB connection closed.');
    //         process.exit(0);
    //     });
    // });

    db.once('open', () => {
        console.log('Connected to DB !!');
    });
}

export default DB
import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI || "";
if(!dbUri){
    console.error("NO URI IN .env");
    throw new Error("Please define MONGODB_URI in .env");
}

let connection = {
    isConnected:0
};

async function dbConnect() {
    if(connection.isConnected !== 0){
        console.log("Already connected to DB");
        return;
    }

    try {
        const db = await mongoose.connect(dbUri);
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully");
    } catch (error) {
        console.log("Error connecting DB: ", error);
        process.exit(1);
    }
}

export default dbConnect;
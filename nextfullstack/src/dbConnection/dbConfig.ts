import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err)=>{
            console.log(`Error connnecting db ${err}`);
        })

    } catch (error) {
        console.log(`Something went wrong while connecting to DB: ${error}`);
    }
}
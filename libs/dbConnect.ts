import mongoose from "mongoose";

export async function dbConnect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDb connected");
        })

        connection.on("error", (err) => {
            console.log("Mongodb connect error, make sure db is up and running" + err);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        console.log(error);
    }
}
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const URI = process.env.MONGO_URI;

const initializeDB = () => {
    mongoose
        .connect(URI)
        .then(() => console.log("Database connected successfully."))
        .catch((err) =>
            console.log("Error occured while connecting to Database.", err)
        );
};
export default initializeDB;

import mongoose from "mongoose";

let database: mongoose.Connection;
export const databaseConnect = () => {
    const uri = `mongodb://localhost:27017/${process.env.DATABASE_NAME}`;

    if (database) {
        return;
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    database = mongoose.connection;
    database.once("open", async () => {
        console.log("Connected to database");
    });
    database.on("error", () => {
        console.log("Error connecting to database");
    });
};

export const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect();
};
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import {handleErrors} from "./middlewares";

const appName = process.env.APP || "orderspot";
const port = process.env.SERVER_PORT || 5000;
const mongoString = process.env.MONGO_STRING;

const main = async () => {
    const app = express();
    // app.use(routers);
    app.use(handleErrors);

    // @ts-ignore
    await mongoose.connect(mongoString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        poolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 20000,
    });

    mongoose.connection.on("connected", () => {
        console.log("Mongoose default connection open to " + process.env.MONGO_STRING,);
    });

    mongoose.connection.on("error", e => {
        console.log(`Mongoose default connection error: ${e}`);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose default connection disconnected");
    });

    process.on("SIGINT", () => {
        mongoose.disconnect(() => {
            console.log("Mongoose connections disconnected through app termination");
            process.exit(0);
        });
    });

    return app;
};

main()
    .then(app => {
        app.listen(port, () => {
            console.log(`${appName} started! port -> ${port}`);
        })
    })
    .catch(e => {
        console.error(e);
    });

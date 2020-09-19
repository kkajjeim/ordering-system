import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as path from "path";
import router from "./controller";
import {errorHanlder} from "./middleware";


const appName = process.env.APP || "orderspot";
const port = process.env.SERVER_PORT || 5000;
const nodeEnv = process.env.NODE_ENV || 'development';
const mongoString = nodeEnv === 'test'
    ? process.env.MONGO_TEST_STRING
    : process.env.MONGO_STRING;

export const main = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(router);

    if (nodeEnv === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    app.use(errorHanlder);

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
        console.log("Mongoose default connection open to " + mongoString,);
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

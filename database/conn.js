import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../config.js'

async function connect(){

    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    //const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connected")
    return db;
}

export default connect;

/**import mongoose, { connection } from "mongoose";
import config from "../cinfig2";

let database;

const connect = async () => {
    const MONGODB_URL = config.DB_CONNECTION_STRING;

    if(database) return;

    mongoose
    .connect(MONGODB_URL)
    .then((Connection) => {
        database = Connection;
        console.log("Database Connected");

    })
    .catch((err) => {
        console.log(err);
    });
};

export {connect};*/
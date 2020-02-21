import mongoose from "mongoose";
import getConfig from "next/config";
import Location from "./models/Location";
mongoose.set("useFindAndModify", false);

export interface IDbConfig {
  url: string;
}

const getDbConfig = (): IDbConfig => {
  const {
    serverRuntimeConfig: { db }
  } = getConfig();

  return db;
};

const startConnection = async () => {
  const db = getDbConfig();
  const connect = async () => {
    try {
      console.log(`Attempting connection to ${db.url}`);
      await mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      return console.log(`Successfully connected to ${db.url}`);
    } catch (error) {
      console.error("Error connecting to database: ", error);
      return process.exit(1);
    }
  };

  await connect();

  mongoose.connection.on("disconnected", connect);
};

export default async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await startConnection();
};

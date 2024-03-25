import mongoose from "mongoose";

const db = {};

export const connect = async () => {
  try {
    if (db.isConnected) {
      console.log("DB is already connected");
      return;
    }
    const mongo = await mongoose.connect(process.env.MONGO);
    db.isConnected = mongo.connections[0].readyState;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

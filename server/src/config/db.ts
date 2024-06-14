import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log("DB connected!");
    await db.connection.collection("students").dropIndex("role_1");
    console.log("Removed unique index on role field");
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("DB connected!");
};

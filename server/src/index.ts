import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT as unknown as number;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, world! Server working..." });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});

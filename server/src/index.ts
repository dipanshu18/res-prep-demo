import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { verifyUser } from "./middlewares/auth";

dotenv.config();

const PORT = process.env.PORT as unknown as number;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", verifyUser, userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.path} ${req.method}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, world! Server working..." });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}`);
});

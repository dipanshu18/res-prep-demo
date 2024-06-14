import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import { authRouter } from "./routes/auth";
import { adminRouter } from "./routes/user";
import { verifyUser } from "./middlewares/auth";
import { teacherRouter } from "./routes/teacher";
import { studentRouter } from "./routes/student";

dotenv.config();

const PORT = process.env.PORT as unknown as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.path} ${req.method}`);
  next();
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admins", verifyUser, adminRouter);
app.use("/api/v1/teachers", verifyUser, teacherRouter);
app.use("/api/v1/students", verifyUser, studentRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server up and running..." });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}`);
});

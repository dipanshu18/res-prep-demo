import express from "express";
import { login, logout, signup } from "../controllers/auth";
import { verifyUser } from "../middlewares/auth";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", verifyUser, logout);

export { authRouter };

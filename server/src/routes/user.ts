import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.patch("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export { userRouter };

import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const adminRouter = express.Router();

adminRouter.get("/", getUsers);

adminRouter.get("/:id", getUser);

adminRouter.patch("/:id", updateUser);

adminRouter.delete("/:id", deleteUser);

export { adminRouter };

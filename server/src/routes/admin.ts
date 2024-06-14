import express from "express";
import {
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.get("/", getAdmins);

adminRouter.get("/:id", getAdmin);

adminRouter.patch("/:id", updateAdmin);

adminRouter.delete("/:id", deleteAdmin);

export { adminRouter };

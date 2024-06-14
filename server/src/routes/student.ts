import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "../controllers/student";
import { verifyAdmin } from "../middlewares/adminAccess";

const studentRouter = express.Router();

studentRouter.get("/", getStudents);

studentRouter.get("/:id", getStudent);

studentRouter.post("/", verifyAdmin, createStudent);

studentRouter.patch("/:id", verifyAdmin, updateStudent);

studentRouter.delete("/:id", verifyAdmin, deleteStudent);

export { studentRouter };

import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
} from "../controllers/teacher";
import { verifyAdmin } from "../middlewares/adminAccess";

const teacherRouter = express.Router();

teacherRouter.get("/", getTeachers);

teacherRouter.get("/:id", getTeacher);

teacherRouter.post("/", verifyAdmin, createTeacher);

teacherRouter.patch("/:id", verifyAdmin, updateTeacher);

teacherRouter.delete("/:id", verifyAdmin, deleteTeacher);

export { teacherRouter };

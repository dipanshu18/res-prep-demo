import dotenv from "dotenv";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { adminModel } from "../models/adminModel";
import mongoose from "mongoose";
import { teacherModel } from "../models/teacherModel";
import { studentModel } from "../models/studentModel";

dotenv.config();

const SECRET = process.env.SECRET as string;

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const adminExists = await adminModel.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    if (role === "ADMIN") {
      const hashedPass = await bcrypt.hash(password, 10);
      const newAdmin = await adminModel.create({
        name,
        email,
        password: hashedPass,
        role,
      });

      if (newAdmin) {
        await newAdmin.save();

        const token = jwt.sign(
          { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role },
          SECRET,
        );

        res.cookie("uid", token, { httpOnly: true, secure: true });
        res.status(201).json({ message: "Admin created success!" });
      }
    } else {
      return res.status(400).json({ message: "Invalid role!" });
    }
  } catch (error) {
    console.log("Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      if (error.errors.email) {
        return res.status(400).json({
          message:
            "Email must be registered with firstname.lastname@vit.edu.in",
        });
      }
    }

    return res
      .status(500)
      .json({ message: "Error while signing up with provided credentials!" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (role === "ADMIN") {
      const adminExists = await adminModel.findOne({ email });
      if (!adminExists) {
        return res.status(404).json({ message: "Admin doesn't exists!" });
      }

      const passVerify = await bcrypt.compare(password, adminExists.password);

      if (!passVerify) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign(
        {
          id: adminExists._id,
          email: adminExists.email,
          role: adminExists.role,
        },
        SECRET,
      );

      res.cookie("uid", token, { httpOnly: true, secure: true });
      return res.status(200).json({ message: "Admin login success!" });
    } else if (role === "TEACHER") {
      const teacherExists = await teacherModel.findOne({ email, role });
      if (!teacherExists) {
        return res.status(404).json({ message: "Teacher doesn't exists!" });
      }

      const passVerify = await bcrypt.compare(password, teacherExists.password);

      if (!passVerify) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign(
        {
          id: teacherExists._id,
          email: teacherExists.email,
          department: teacherExists.department,
          semester: teacherExists.semester,
          role: teacherExists.role,
        },
        SECRET,
      );

      res.cookie("uid", token, { httpOnly: true, secure: true });
      return res.status(200).json({ message: "Teacher login success!" });
    } else if (role === "STUDENT") {
      const studentExists = await studentModel.findOne({ email, role });
      if (!studentExists) {
        return res.status(404).json({ message: "Student doesn't exists!" });
      }

      const passVerify = await bcrypt.compare(password, studentExists.password);

      if (!passVerify) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign(
        {
          id: studentExists._id,
          email: studentExists.email,
          rollNo: studentExists.rollNo,
          department: studentExists.department,
          semester: studentExists.semester,
          role: studentExists.role,
        },
        SECRET,
      );

      res.cookie("uid", token, { httpOnly: true, secure: true });
      return res.status(200).json({ message: "Student login success!" });
    } else {
      return res.status(400).json({ message: "Invalid role!" });
    }
  } catch (error) {
    console.log("Error:", error);

    return res
      .status(500)
      .json({ message: "Error while signing up with provided credentials!" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("uid");
    res.status(200).json({ message: "Logout success!" });
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(500)
      .json({ message: "Error while signup with provided credentials!" });
  }
};

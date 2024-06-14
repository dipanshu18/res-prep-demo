import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { teacherModel } from "../models/teacherModel";

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const { department, semester, role } = req.body.user;

    let query = {};
    if (role === "TEACHER" || role === "STUDENT") {
      query = {
        role: { $in: ["TEACHER", "STUDENT"] },
        department: department,
        semester: semester,
      };
    }

    const teachers = await teacherModel.find(query);

    if (teachers.length < 1) {
      return res.status(404).json({ message: "No teachers found" });
    }

    return res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacherExists = await teacherModel.findById(id);

    if (!teacherExists)
      return res.status(404).json({ message: "No teacher found" });

    return res.status(200).json(teacherExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, department, semester, password } = req.body;

    if (!name || !email || !department || !semester || !password)
      return res
        .status(400)
        .json({ message: "Please provide all credentials" });

    const teacherExists = await teacherModel.findOne({ email });
    if (teacherExists)
      return res.status(404).json({ message: "Teacher already exists!" });

    const hashPass = await bcrypt.hash(password, 10);
    const newTeacher = await teacherModel.create({
      name,
      email,
      department,
      semester,
      password: hashPass,
    });

    if (newTeacher) await newTeacher.save();
    return res.status(201).json({ message: "Teacher created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, department, semester, password } = req.body;

    if (!name && !email && !department && !semester && !password)
      return res.status(400).json({ message: "Nothing to update" });

    const teacherExists = await teacherModel.findById(id);
    if (!teacherExists)
      return res.status(404).json({ message: "No teacher found" });

    const updatedInfo: {
      name?: string;
      email?: string;
      password?: string;
      department?: string;
      semester?: string;
    } = {};

    if (name) updatedInfo.name = name;
    if (email) updatedInfo.email = email;
    if (department) updatedInfo.department = department;
    if (semester) updatedInfo.semester = semester;
    if (password) updatedInfo.password = await bcrypt.hash(password, 10);

    const updatedTeacher = await teacherModel.updateOne(
      { _id: id },
      updatedInfo,
    );

    if (updatedTeacher)
      return res.status(200).json({ message: "Teacher updated success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacherExists = await teacherModel.findById(id);

    if (!teacherExists)
      return res.status(404).json({ message: "No teacher found" });

    await teacherModel.deleteOne({ _id: id });

    return res.status(200).json({ message: "Teacher deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { studentModel } from "../models/studentModel";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const { department, semester } = req.body;
    const students = await studentModel.find({ department, semester });

    if (students.length < 1) {
      return res.status(404).json({ message: "No students found" });
    }

    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const studentExists = await studentModel.findById(id);

    if (!studentExists)
      return res.status(404).json({ message: "No student found" });

    return res.status(200).json(studentExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, rollNo, department, semester, password } = req.body;

    if (!name || !email || !rollNo || !department || !semester || !password)
      return res
        .status(400)
        .json({ message: "Please provide all credentials" });

    const studentExists = await studentModel.findOne({ email, rollNo });
    if (studentExists)
      return res.status(404).json({ message: "Student already exists!" });

    const hashPass = await bcrypt.hash(password, 10);
    const newStudent = await studentModel.create({
      name,
      email,
      rollNo,
      department,
      semester,
      password: hashPass,
    });

    if (newStudent) await newStudent.save();
    return res.status(200).json({ message: "Student created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, rollNo, department, semester, password } = req.body;

    if (!name && !email && !rollNo && !department && !semester && !password)
      return res.status(400).json({ message: "Nothing to update" });

    const studentExists = await studentModel.findById(id);
    if (!studentExists)
      return res.status(404).json({ message: "No student found" });

    const updatedInfo: {
      name?: string;
      email?: string;
      rollNo?: string;
      password?: string;
      department?: string;
      semester?: string;
    } = {};

    if (name) updatedInfo.name = name;
    if (email) updatedInfo.email = email;
    if (rollNo) updatedInfo.rollNo = rollNo;
    if (department) updatedInfo.department = department;
    if (semester) updatedInfo.semester = semester;
    if (password) updatedInfo.password = await bcrypt.hash(password, 10);

    const updatedStudent = await studentModel.updateOne(
      { _id: id },
      updatedInfo,
    );

    if (updatedStudent)
      return res.status(200).json({ message: "Student updated success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const studentExists = await studentModel.findById(id);

    if (!studentExists)
      return res.status(404).json({ message: "No student found" });

    await studentModel.deleteOne({ _id: id });

    res.clearCookie("uid");
    return res.status(200).json({ message: "Student deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

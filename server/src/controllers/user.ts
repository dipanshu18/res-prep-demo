import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userModel } from "../models/userModel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role } = req.body.user;

    let query = {};
    if (role === "TEACHER" || role === "STUDENT") {
      query = { role: { $in: ["TEACHER", "STUDENT"] } };
    }

    const users = await userModel.find(query);

    if (users.length < 1) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userExists = await userModel.findById(id);

    if (!userExists) return res.status(404).json({ message: "No users found" });

    return res.status(200).json(userExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userExists = await userModel.findById(id);

    if (!name && !email && !password)
      return res.status(400).json({ message: "Nothing to update" });

    if (!userExists) return res.status(404).json({ message: "No users found" });

    const updatedInfo: { name?: string; email?: string; password?: string } =
      {};

    if (name) updatedInfo.name = name;
    if (email) updatedInfo.email = email;
    if (password) updatedInfo.password = await bcrypt.hash(password, 10);

    const updatedUser = await userModel.updateOne({ _id: id }, updatedInfo);

    if (updatedUser)
      return res.status(200).json({ message: "User updated success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userExists = await userModel.findById(id);

    if (!userExists) return res.status(404).json({ message: "No users found" });

    await userModel.deleteOne({ _id: id });

    res.clearCookie("uid");
    return res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

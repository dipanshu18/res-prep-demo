import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { adminModel } from "../models/adminModel";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await adminModel.find({});

    if (admins.length < 1) {
      return res.status(404).json({ message: "No admins found" });
    }

    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminExists = await adminModel.findById(id);

    if (!adminExists)
      return res.status(404).json({ message: "No admin found" });

    return res.status(200).json(adminExists);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const adminExists = await adminModel.findById(id);

    if (!name && !email && !password)
      return res.status(400).json({ message: "Nothing to update" });

    if (!adminExists)
      return res.status(404).json({ message: "No admins found" });

    const updatedInfo: { name?: string; email?: string; password?: string } =
      {};

    if (name) updatedInfo.name = name;
    if (email) updatedInfo.email = email;
    if (password) updatedInfo.password = await bcrypt.hash(password, 10);

    const updatedAdmin = await adminModel.updateOne({ _id: id }, updatedInfo);

    if (updatedAdmin)
      return res.status(200).json({ message: "Admin updated success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminExists = await adminModel.findById(id);

    if (!adminExists)
      return res.status(404).json({ message: "No admin found" });

    await adminModel.deleteOne({ _id: id });

    return res.status(200).json({ message: "Admin deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

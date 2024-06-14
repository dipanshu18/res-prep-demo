import dotenv from "dotenv";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel } from "../models/userModel";
import mongoose from "mongoose";

dotenv.config();

const SECRET = process.env.SECRET as string;
const ROLES = ["ADMIN", "TEACHER", "STUDENT"];

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    if (ROLES.includes(role)) {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name,
        email,
        password: hashedPass,
        role,
      });

      if (newUser) {
        await newUser.save();

        const token = jwt.sign(
          { id: newUser._id, email: newUser.email, role: newUser.role },
          SECRET,
        );

        res.cookie("uid", token, { httpOnly: true, secure: true });
        res.status(201).json({ message: "User created success!" });
      }
    } else {
      return res.status(400).json({ message: "Invalid role!" });
    }
  } catch (error) {
    console.log("Error:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      if (error.errors.email) {
        return res
          .status(400)
          .json({ message: "Email must be registered with @vit.edu.in" });
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

    const userExists = await userModel.findOne({ email, role });

    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exists!" });
    }

    const passVerify = await bcrypt.compare(password, userExists.password);

    if (!passVerify) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = jwt.sign(
      { id: userExists._id, email: userExists.email, role: userExists.role },
      SECRET,
    );

    res.cookie("uid", token, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Login success!" });
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

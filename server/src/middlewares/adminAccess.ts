import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRET as string;
const ROLE = "ADMIN";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { uid } = req.cookies;

  if (!uid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(uid, SECRET) as JwtPayload;

  if (ROLE !== decoded.role) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.body.user = decoded;
  next();
};

import mongoose from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z]\.[a-z]@vit\.edu\.in$/,
    message:
      "Given email is not a valid email! It should be in the format [a-z].[a-z]@vit.edu.in",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "TEACHER", "STUDENT"],
    required: true,
  },
});

export const userModel = mongoose.model<User>("User", userSchema);

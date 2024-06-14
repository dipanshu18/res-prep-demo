import mongoose from "mongoose";

interface Teacher extends Document {
  name: string;
  email: string;
  password: string;
  department: "INFT" | "CMPN" | "EE" | "ENTC" | "BIOMED";
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  role: "TEACHER";
}

const teacherSchema = new mongoose.Schema<Teacher>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-z]+\.[a-z]+@vit\.edu\.in$/,
      "Given email is not a valid email! It should be in the format firstname.lastname@vit.edu.in",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "TEACHER",
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

export const teacherModel = mongoose.model<Teacher>("Teacher", teacherSchema);

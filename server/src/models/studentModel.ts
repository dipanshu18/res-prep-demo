import mongoose, { Document, Schema } from "mongoose";

interface Student extends Document {
  name: string;
  rollNo: string;
  email: string;
  password: string;
  role: "STUDENT";
  department: "CMPN" | "INFT" | "EE" | "ENTC" | "BIOMED";
  semester: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

const studentSchema = new Schema<Student>({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
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
    default: "STUDENT",
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

export const studentModel = mongoose.model<Student>("Student", studentSchema);

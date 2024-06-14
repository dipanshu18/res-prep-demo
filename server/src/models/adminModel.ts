import mongoose from "mongoose";

interface Admin extends Document {
  name: string;
  email: string;
  password: string;
  role: "ADMIN";
}

const adminSchema = new mongoose.Schema<Admin>({
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
    default: "ADMIN",
    required: true,
  },
});

export const adminModel = mongoose.model<Admin>("Admin", adminSchema);

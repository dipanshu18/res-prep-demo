import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import { AdminLogin } from "./pages/admin/Login";
import { TeacherLogin } from "./pages/teacher/Login";
import { StudentLogin } from "./pages/student/Login";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { TeacherDashboard } from "./pages/teacher/TeacherDashboard";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { AdminProfile } from "./pages/admin/AdminProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* ADMIN ROUTES */}
      <Route path="/a/login" element={<AdminLogin />} />
      <Route path="/a/dashboard" element={<AdminDashboard />} />
      <Route path="/a/profile" element={<AdminProfile />} />

      {/* TEACHER ROUTES */}
      <Route path="/t/login" element={<TeacherLogin />} />
      <Route path="/t/dashboard" element={<TeacherDashboard />} />

      {/* STUDENT ROUTES */}
      <Route path="/s/login" element={<StudentLogin />} />
      <Route path="/s/dashboard" element={<StudentDashboard />} />
    </Routes>
  );
}

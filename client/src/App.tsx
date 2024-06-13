import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import { AdminLogin } from "./pages/admin/Login";
import { AdminSignup } from "./pages/admin/Signup";
import { TeacherLogin } from "./pages/teacher/Login";
import { StudentLogin } from "./pages/student/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/a/signup" element={<AdminSignup />} />
      <Route path="/a/login" element={<AdminLogin />} />
      <Route path="/t/login" element={<TeacherLogin />} />
      <Route path="/s/login" element={<StudentLogin />} />
    </Routes>
  );
}

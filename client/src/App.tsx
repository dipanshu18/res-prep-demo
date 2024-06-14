import { ReactElement, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import { AdminLogin } from "./pages/admin/Login";
import { TeacherLogin } from "./pages/teacher/Login";
import { StudentLogin } from "./pages/student/Login";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { TeacherDashboard } from "./pages/teacher/TeacherDashboard";
import { StudentDashboard } from "./pages/student/StudentDashboard";

import { Navbar } from "./components/Navbar";

function getRedirectPathForRole(role: string | null) {
  switch (role) {
    case "ADMIN":
      return "/a/dashboard";
    case "TEACHER":
      return "/t/dashboard";
    case "STUDENT":
      return "/s/dashboard";
    default:
      return "/";
  }
}

function ProtectedRoute({
  element,
  role,
}: {
  element: ReactElement;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}) {
  const auth = localStorage.getItem("auth");
  const userRole = localStorage.getItem("role");

  if (!auth) {
    return <Navigate to="/" />;
  }

  if (auth && userRole !== role) {
    return <Navigate to={getRedirectPathForRole(userRole)} />;
  }

  return element;
}

function ProtectedLayout({
  children,
  role,
}: {
  children: ReactNode;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}) {
  return (
    <>
      <Navbar role={role} />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* ADMIN ROUTES */}
      <Route path="/a/login" element={<AdminLogin />} />
      <Route
        path="/a/dashboard"
        element={
          <ProtectedRoute
            role="ADMIN"
            element={
              <ProtectedLayout role="ADMIN">
                <AdminDashboard />
              </ProtectedLayout>
            }
          />
        }
      />

      {/* TEACHER ROUTES */}
      <Route path="/t/login" element={<TeacherLogin />} />
      <Route
        path="/t/dashboard"
        element={
          <ProtectedRoute
            role="TEACHER"
            element={
              <ProtectedLayout role="TEACHER">
                <TeacherDashboard />
              </ProtectedLayout>
            }
          />
        }
      />

      {/* STUDENT ROUTES */}
      <Route path="/s/login" element={<StudentLogin />} />
      <Route
        path="/s/dashboard"
        element={
          <ProtectedRoute
            role="STUDENT"
            element={
              <ProtectedLayout role="STUDENT">
                <StudentDashboard />
              </ProtectedLayout>
            }
          />
        }
      />
    </Routes>
  );
}

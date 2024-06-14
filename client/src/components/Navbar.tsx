import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

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

export const Navbar = ({ role }: { role: "ADMIN" | "TEACHER" | "STUDENT" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        { withCredentials: true },
      );

      const data = await response.data;

      if (response.status === 200) {
        toast.success(data.message);
        localStorage.removeItem("auth");
        localStorage.removeItem("role");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.response && toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          to={getRedirectPathForRole(role)}
          className="btn btn-ghost text-2xl font-extrabold"
        >
          resPrep
        </Link>
      </div>
      <div className="flex-none">
        <button onClick={handleLogout} className="btn btn-neutral">
          Logout
        </button>
      </div>
    </div>
  );
};

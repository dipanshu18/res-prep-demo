import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { User } from "lucide-react";
import { toast } from "sonner";

export const Navbar = () => {
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
        <span className="text-2xl font-extrabold">resPrep</span>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="rounded-full">
              <User />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link to="/a/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

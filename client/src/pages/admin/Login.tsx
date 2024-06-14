import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface AdminLoginData {
  email: string;
  password: string;
  role: "ADMIN";
}

export const AdminLogin = () => {
  const [adminData, setAdminData] = useState<AdminLoginData>({
    email: "",
    password: "",
    role: "ADMIN",
  });

  const navigate = useNavigate();

  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        adminData,
        {
          withCredentials: true,
        },
      );

      const data = await response.data;
      if (response.status === 200) {
        toast.success(data.message);
        localStorage.setItem("auth", "true");
        navigate("/a/dashboard");
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.response && toast.error(error?.response?.data.message);
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Login into our website to get access to resources and features we
            have to provide and make your life easier than before.
          </p>
        </div>
        <div className="card w-full max-w-lg shrink-0 bg-base-100 shadow-2xl">
          <form onSubmit={handleAdminLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                onChange={(e) =>
                  setAdminData({ ...adminData, email: e.target.value })
                }
                value={adminData.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                onChange={(e) =>
                  setAdminData({ ...adminData, password: e.target.value })
                }
                value={adminData.password}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

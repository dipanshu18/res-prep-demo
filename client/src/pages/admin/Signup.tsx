import { useState } from "react";
import { Link } from "react-router-dom";

interface AdminSignupData {
  name: string;
  email: string;
  password: string;
}

export const AdminSignup = () => {
  const [adminData, setAdminData] = useState<AdminSignupData>({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Create an account into our website to get access to resources and
            features we have to provide and make your life easier than before.
          </p>
        </div>
        <div className="card w-full max-w-lg shrink-0 bg-base-100 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="full name"
                onChange={(e) =>
                  setAdminData({ ...adminData, name: e.target.value })
                }
                value={adminData.name}
                className="input input-bordered"
                required
              />
            </div>
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
              <label className="label">
                <span className="label-text-alt">
                  Already have an account?{" "}
                  <Link to="/a/login" className="link-hover link">
                    Login
                  </Link>
                </span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

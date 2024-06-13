import { useState } from "react";

interface StudentLoginData {
  email: string;
  password: string;
}

export const StudentLogin = () => {
  const [studentData, setStudentData] = useState<StudentLoginData>({
    email: "",
    password: "",
  });

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
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                onChange={(e) =>
                  setStudentData({ ...studentData, email: e.target.value })
                }
                value={studentData.email}
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
                  setStudentData({ ...studentData, password: e.target.value })
                }
                value={studentData.password}
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

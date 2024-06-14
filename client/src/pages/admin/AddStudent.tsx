import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: 0,
    email: "",
    password: "",
  });

  const handleAddStudent = async (e: FormEvent) => {
    e.preventDefault();
    console.log(studentData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/students",
        studentData,
        { withCredentials: true },
      );

      const data = await response.data;

      if (response.status === 201) {
        const dialog = document.getElementById(
          "add_student_modal",
        ) as HTMLDialogElement;
        dialog.close();
        toast.success(data.message);
        await new Promise(() => {
          setTimeout(() => {
            setStudentData({
              name: "",
              department: "",
              email: "",
              password: "",
              rollNo: "",
              semester: 0,
            });
            window.location.reload();
          }, 2000);
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.response && toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          const dialog = document.getElementById(
            "add_student_modal",
          ) as HTMLDialogElement;
          dialog.showModal();
        }}
      >
        Add Student
      </button>
      <dialog
        id="add_student_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create student entry!</h3>
          <form onSubmit={handleAddStudent} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="full name"
                onChange={(e) =>
                  setStudentData({ ...studentData, name: e.target.value })
                }
                value={studentData.name}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Roll No</span>
              </label>
              <input
                type="text"
                placeholder="roll no"
                onChange={(e) =>
                  setStudentData({ ...studentData, rollNo: e.target.value })
                }
                value={studentData.rollNo}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <select
                onChange={(e) =>
                  setStudentData({ ...studentData, department: e.target.value })
                }
                value={studentData.department}
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select department
                </option>
                <option value="INFT">INFT</option>
                <option value="CMPN">CMPN</option>
                <option value="EE">EE</option>
                <option value="ENTC">ENTC</option>
                <option value="BIOMED">BIOMED</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Semester</span>
              </label>
              <select
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    semester: parseInt(e.target.value),
                  })
                }
                value={studentData.semester}
                className="select select-bordered w-full"
                required
              >
                <option value={0} disabled>
                  Select semester
                </option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
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
              <button className="btn btn-secondary">Create</button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

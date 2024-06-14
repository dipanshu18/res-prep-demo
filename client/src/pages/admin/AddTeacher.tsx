import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export const AddTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    name: "",
    department: "",
    semester: 0,
    email: "",
    password: "",
  });

  const handleAddTeacher = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/teachers",
        teacherData,
        { withCredentials: true },
      );

      const data = await response.data;

      if (response.status === 201) {
        const dialog = document.getElementById(
          "add_teacher_modal",
        ) as HTMLDialogElement;
        dialog.close();
        toast.success(data.message);
        await new Promise(() => {
          setTimeout(() => {
            setTeacherData({
              name: "",
              department: "",
              email: "",
              password: "",
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
        className="btn"
        onClick={() => {
          const dialog = document.getElementById(
            "add_teacher_modal",
          ) as HTMLDialogElement;
          dialog?.showModal();
        }}
      >
        Add Teacher
      </button>
      <dialog
        id="add_teacher_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create teacher entry!</h3>
          <form onSubmit={handleAddTeacher} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="full name"
                onChange={(e) =>
                  setTeacherData({ ...teacherData, name: e.target.value })
                }
                value={teacherData.name}
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
                  setTeacherData({ ...teacherData, department: e.target.value })
                }
                value={teacherData.department}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select department
                </option>
                <option>INFT</option>
                <option>CMPN</option>
                <option>EE</option>
                <option>ENTC</option>
                <option>BIOMED</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Semester</span>
              </label>
              <select
                onChange={(e) =>
                  setTeacherData({
                    ...teacherData,
                    semester: parseInt(e.target.value),
                  })
                }
                value={teacherData.semester}
                className="select select-bordered w-full"
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
                  setTeacherData({ ...teacherData, email: e.target.value })
                }
                value={teacherData.email}
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
                  setTeacherData({ ...teacherData, password: e.target.value })
                }
                value={teacherData.password}
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

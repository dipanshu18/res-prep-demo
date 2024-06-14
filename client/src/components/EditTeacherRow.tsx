import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Teacher } from "../types/teacher";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const EditTeacherRow = ({
  editMode,
  setEditMode,
  id,
  teacher,
}: {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  id: string;
  teacher: Teacher;
}) => {
  const [editTeacherData, setEditTeacherData] = useState<Teacher>({
    _id: id,
    name: teacher?.name,
    email: teacher?.email,
    department: teacher?.department,
    semester: teacher?.semester,
    role: teacher?.role,
  });

  const handleTeacherUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/teachers/${id}`,
        editTeacherData,
        { withCredentials: true },
      );

      const data = await response.data;

      if (response.status === 200) {
        toast.success(data.message);
        setEditMode(false);
        await new Promise(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        error.response && toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <tr className="hover">
        <th></th>
        <td>
          <input
            type="text"
            placeholder="full name"
            onChange={(e) =>
              setEditTeacherData({ ...editTeacherData, name: e.target.value })
            }
            value={editTeacherData.name}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>
          <select
            onChange={(e) =>
              setEditTeacherData({
                ...editTeacherData,
                department: e.target.value,
              })
            }
            value={editTeacherData.department}
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
        </td>
        <td>
          <select
            onChange={(e) =>
              setEditTeacherData({
                ...editTeacherData,
                semester: parseInt(e.target.value),
              })
            }
            value={editTeacherData.semester}
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
        </td>
        <td>
          {" "}
          <input
            type="email"
            placeholder="email"
            onChange={(e) =>
              setEditTeacherData({ ...editTeacherData, email: e.target.value })
            }
            value={editTeacherData.email}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>{teacher.role}</td>
        <td>
          <button
            onClick={() => setEditMode(!editMode)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </td>
        <td>
          <button onClick={handleTeacherUpdate} className="btn btn-neutral">
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};

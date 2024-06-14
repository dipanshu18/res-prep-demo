import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Student } from "../types/student";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const EditStudentRow = ({
  editMode,
  setEditMode,
  id,
  student,
}: {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  id: string;
  student: Student;
}) => {
  const [editStudentData, setEditStudentData] = useState<Student>({
    _id: id,
    name: student?.name,
    rollNo: student?.rollNo,
    department: student?.department,
    semester: student?.semester,
    email: student?.email,
    role: student?.role,
  });

  const handleStudentUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/students/${id}`,
        editStudentData,
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
              setEditStudentData({ ...editStudentData, name: e.target.value })
            }
            value={editStudentData.name}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="roll no"
            onChange={(e) =>
              setEditStudentData({
                ...editStudentData,
                rollNo: e.target.value,
              })
            }
            value={editStudentData.rollNo}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>
          <select
            onChange={(e) =>
              setEditStudentData({
                ...editStudentData,
                department: e.target.value,
              })
            }
            value={editStudentData.department}
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
              setEditStudentData({
                ...editStudentData,
                semester: parseInt(e.target.value),
              })
            }
            value={editStudentData.semester}
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
          <input
            type="email"
            placeholder="email"
            onChange={(e) =>
              setEditStudentData({ ...editStudentData, email: e.target.value })
            }
            value={editStudentData.email}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>
          <select
            onChange={(e) =>
              setEditStudentData({
                ...editStudentData,
                role: e.target.value,
              })
            }
            value={editStudentData.role}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select department
            </option>
            <option value="ADMIN">ADMIN</option>
            <option value="TEACHER">TEACHER</option>
            <option value="STUDENT">STUDENT</option>
          </select>
        </td>
        <td>
          <button
            onClick={() => setEditMode(!editMode)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </td>
        <td>
          <button onClick={handleStudentUpdate} className="btn btn-neutral">
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};

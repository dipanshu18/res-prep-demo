import { PenBox, Trash2 } from "lucide-react";
import { Teacher } from "../types/teacher";
import { FormEvent, useState } from "react";
import { EditTeacherRow } from "./EditTeacherRow";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const TeacherRow = ({
  teacher,
  idx,
  currentUserRole,
}: {
  teacher: Teacher;
  idx: number;
  currentUserRole: "ADMIN" | "TEACHER" | "STUDENT";
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleTeacherDelete = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/teachers/${teacher._id}`,
        { withCredentials: true },
      );

      const data = await response.data;

      if (response.status === 200) {
        toast.success(data.message);

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
      {!editMode ? (
        <tr className="hover">
          <th>{idx + 1}</th>
          <td>{teacher.name}</td>
          <td>{teacher.department}</td>
          <td>{teacher.semester}</td>
          <td>{teacher.email}</td>
          <td>{teacher.role}</td>
          <td>
            {currentUserRole === "ADMIN" && (
              <button
                onClick={() => setEditMode(!editMode)}
                className="btn btn-ghost"
              >
                <PenBox />
              </button>
            )}
          </td>
          <td>
            {currentUserRole === "ADMIN" && (
              <button onClick={handleTeacherDelete} className="btn btn-error">
                <Trash2 />
              </button>
            )}
          </td>
        </tr>
      ) : (
        <EditTeacherRow
          teacher={teacher}
          id={teacher._id}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </>
  );
};

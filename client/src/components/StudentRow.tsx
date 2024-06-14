import { PenBox, Trash2 } from "lucide-react";
import { Student } from "../types/student";
import { FormEvent, useState } from "react";
import { EditStudentRow } from "./EditStudentRow";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const StudentRow = ({
  student,
  idx,
  currentUserRole,
}: {
  student: Student;
  idx: number;
  currentUserRole: "ADMIN" | "TEACHER" | "STUDENT";
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleStudentDelete = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/students/${student._id}`,
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
          <td>{student.name}</td>
          <td>{student.rollNo}</td>
          <td>{student.department}</td>
          <td>{student.semester}</td>
          <td>{student.email}</td>
          <td>{student.role}</td>
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
              <button onClick={handleStudentDelete} className="btn btn-error">
                <Trash2 />
              </button>
            )}
          </td>
        </tr>
      ) : (
        <EditStudentRow
          editMode={editMode}
          setEditMode={setEditMode}
          student={student}
          id={student._id}
        />
      )}
    </>
  );
};

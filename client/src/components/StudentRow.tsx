import { Pen, Trash } from "lucide-react";
import { Student } from "../types/student";

export const StudentRow = ({
  student,
  idx,
}: {
  student: Student;
  idx: number;
}) => {
  return (
    <tr className="hover">
      <th>{idx + 1}</th>
      <td>{student.name}</td>
      <td>{student.rollNo}</td>
      <td>{student.department}</td>
      <td>{student.semester}</td>
      <td>{student.email}</td>
      <td>{student.role}</td>
      <td>
        <div className="btn btn-ghost">
          <Pen />
        </div>
      </td>
      <td>
        <div className="btn btn-error">
          <Trash />
        </div>
      </td>
    </tr>
  );
};

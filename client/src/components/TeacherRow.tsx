import { Pen, Trash } from "lucide-react";
import { Teacher } from "../types/teacher";

export const TeacherRow = ({
  teacher,
  idx,
}: {
  teacher: Teacher;
  idx: number;
}) => {
  return (
    <>
      {/* row */}
      <tr className="hover">
        <th>{idx + 1}</th>
        <td>{teacher.name}</td>
        <td>{teacher.department}</td>
        <td>{teacher.semester}</td>
        <td>{teacher.email}</td>
        <td>{teacher.role}</td>
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
    </>
  );
};

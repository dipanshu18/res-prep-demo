import { Student } from "../types/student";
import { StudentRow } from "./StudentRow";

export const StudentsTable = ({ students }: { students: Student[] }) => {
  const currentUserRole = localStorage.getItem("role") as
    | "STUDENT"
    | "TEACHER"
    | "ADMIN";
  return (
    <>
      <h1 className="text-2xl font-semibold">Students Data</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {students.map((student, idx) => (
              <StudentRow
                student={student}
                currentUserRole={currentUserRole}
                idx={idx}
                key={student._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

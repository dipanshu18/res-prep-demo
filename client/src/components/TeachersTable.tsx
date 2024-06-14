import { Teacher } from "../types/teacher";
import { TeacherRow } from "./TeacherRow";

export const TeachersTable = ({ teachers }: { teachers: Teacher[] }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Teachers Data</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, idx) => (
              <TeacherRow teacher={teacher} key={teacher._id} idx={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const TeacherDashboard = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<Promise<User[] | []>>(
        "http://localhost:8080/api/v1/users",
        {
          withCredentials: true,
        },
      );

      const data = await response.data;

      if (response.status === 200) {
        setTeachers(data.filter((user: User) => user.role === "TEACHER"));
        setStudents(data.filter((user: User) => user.role === "STUDENT"));
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.response && toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="container p-10">
        <div className="mb-10">
          <h1>Teachers Data</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {teachers &&
                  teachers.map((teacher, idx) => (
                    <tr key={teacher._id} className="hover">
                      <th>{idx + 1}</th>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.role}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h1>Students Data</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {students &&
                  students.map((student, idx) => (
                    <tr key={student._id} className="hover">
                      <th>{idx + 1}</th>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.role}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

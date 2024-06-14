import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Pen, Trash } from "lucide-react";
import { AddStudent } from "./AddStudent";
import { AddTeacher } from "./AddTeacher";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const AdminDashboard = () => {
  const [admins, setAdmins] = useState<User[]>([]);
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
        setAdmins(data.filter((user: User) => user.role === "ADMIN"));
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
        <div className="mb-10 flex gap-10">
          <AddTeacher />
          <AddStudent />
        </div>

        <div className="mb-10">
          <h1 className="text-2xl font-semibold">Admins Data</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {admins &&
                  admins.map((admin, idx) => (
                    <tr key={admin._id} className="hover">
                      <th>{idx + 1}</th>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.role}</td>
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-10">
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
                {/* row */}
                {teachers &&
                  teachers.map((teacher, idx) => (
                    <tr key={teacher._id} className="hover">
                      <th>{idx + 1}</th>
                      <td>{teacher.name}</td>
                      <td>INFT</td>
                      <td>7</td>
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
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
                {students &&
                  students.map((student, idx) => (
                    <tr key={student._id} className="hover">
                      <th>{idx + 1}</th>
                      <td>{student.name}</td>
                      <td>21101A0034</td>
                      <td>INFT</td>
                      <td>7</td>
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

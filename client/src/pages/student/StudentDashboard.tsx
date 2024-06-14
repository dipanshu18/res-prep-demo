import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { TeachersTable } from "../../components/TeachersTable";
import { StudentsTable } from "../../components/StudentsTable";
import { Teacher } from "../../types/teacher";
import { Student } from "../../types/student";

export const StudentDashboard = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get<Promise<Teacher[] | []>>(
        "http://localhost:8080/api/v1/teachers",
        {
          withCredentials: true,
        },
      );

      const data = await response.data;

      if (response.status === 200) {
        setTeachers(data);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.response && toast.error(error.response?.data.message);
      }
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get<Promise<Student[] | []>>(
        "http://localhost:8080/api/v1/students",
        {
          withCredentials: true,
        },
      );

      const data = await response.data;

      if (response.status === 200) {
        setStudents(data);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        error.response && toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  return (
    <>
      <div className="container p-10">
        <div className="mb-10">
          <TeachersTable teachers={teachers} />
        </div>

        <div>
          <StudentsTable students={students} />
        </div>
      </div>
    </>
  );
};

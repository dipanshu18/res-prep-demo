import { PenBox, Trash2 } from "lucide-react";
import { Admin } from "../types/admin";
import { FormEvent, useState } from "react";
import { EditAdminRow } from "./EditAdminRow";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const AdminRow = ({ admin, idx }: { admin: Admin; idx: number }) => {
  const [editMode, setEditMode] = useState(false);

  const handleAdminDelete = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admins/${admin._id}`,
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
          <td>{admin.name}</td>
          <td>{admin.email}</td>
          <td>{admin.role}</td>
          <td>
            <div
              onClick={() => setEditMode(!editMode)}
              className="btn btn-ghost"
            >
              <PenBox />
            </div>
          </td>
          <td>
            <button onClick={handleAdminDelete} className="btn btn-error">
              <Trash2 />
            </button>
          </td>
        </tr>
      ) : (
        <EditAdminRow
          editMode={editMode}
          setEditMode={setEditMode}
          admin={admin}
          id={admin._id}
        />
      )}
    </>
  );
};

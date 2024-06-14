import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Admin } from "../types/admin";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const EditAdminRow = ({
  editMode,
  setEditMode,
  id,
  admin,
}: {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  id: string;
  admin: Admin;
}) => {
  const [editAdminData, setEditAdminData] = useState<Admin>({
    _id: id,
    name: admin?.name,
    email: admin?.email,
    role: admin?.role,
  });

  const handleAdminUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/admins/${id}`,
        editAdminData,
        { withCredentials: true },
      );

      const data = await response.data;

      if (response.status === 200) {
        toast.success(data.message);
        setEditMode(false);

        await new Promise(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
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
      <tr className="hover">
        <th></th>
        <td>
          <input
            type="text"
            placeholder="full name"
            onChange={(e) =>
              setEditAdminData({ ...editAdminData, name: e.target.value })
            }
            value={editAdminData.name}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>
          {" "}
          <input
            type="email"
            placeholder="email"
            onChange={(e) =>
              setEditAdminData({ ...editAdminData, email: e.target.value })
            }
            value={editAdminData.email}
            className="input input-bordered w-full"
            required
          />
        </td>
        <td>{admin.role}</td>
        <td>
          <button
            onClick={() => setEditMode(!editMode)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </td>
        <td>
          <button onClick={handleAdminUpdate} className="btn btn-neutral">
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};

import { Pen, Trash } from "lucide-react";
import { Admin } from "../types/admin";

export const AdminRow = ({ admin, idx }: { admin: Admin; idx: number }) => {
  return (
    <tr className="hover">
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
  );
};

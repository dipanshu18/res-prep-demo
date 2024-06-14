import { Admin } from "../types/admin";
import { AdminRow } from "./AdminRow";

export const AdminsTable = ({ admins }: { admins: Admin[] }) => {
  return (
    <>
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
                <AdminRow admin={admin} idx={idx} key={admin._id} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

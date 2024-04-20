import { UserDataTable } from "@/components/dashboard/UserDataTable";
import { getUsers } from "@/lib/data";

const Users = async () => {
  const users = await getUsers();

  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Users</h2>
        <div>
          <UserDataTable rows={users} />
        </div>
      </div>
    </main>
  );
};

export default Users;

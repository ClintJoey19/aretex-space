import { getDriveTemplates, getUsers } from "@/lib/data";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { getSharedDrives } from "@/lib/gdrive";

const DashboardPage = async () => {
  // const templates = await getDriveTemplates();
  // const users = await getUsers();
  // const { user, accessToken, refreshToken } = await auth();
  // const drives = await getSharedDrives(accessToken);
  // console.log(drives);

  return (
    <main className="m-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl">Dashboard</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[200px] bg-white rounded-md"></div>
          <div className="h-[200px] bg-white rounded-md"></div>
          <div className="h-[200px] bg-white rounded-md"></div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

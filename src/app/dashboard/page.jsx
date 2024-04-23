import { getDriveTemplates, getUsers } from "@/lib/data";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { getSharedDrives } from "@/lib/gdrive";
import Gdrive from "@/components/dashboard/Gdrive";

const DashboardPage = async () => {
  // const templates = await getDriveTemplates();
  // const users = await getUsers();
  const { user, accessToken } = await auth();
  // const drives = await getSharedDrives(accessToken);
  // console.log(drives);

  return (
    <main className="m-4">
      <div className="h-full flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">
          Hello there,{" "}
          <span className="text-primary">{user.name} &#128075;</span>
        </h2>
        <div className="h-full grid grid-cols-[1fr_350px] gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col bg-white rounded-md p-4"></div>
            <div className="flex flex-col bg-white rounded-md p-4"></div>
            <div className="h-full flex flex-col col-span-2 bg-white rounded-md p-4"></div>
          </div>
          <div className="h-full flex flex-col gap-4">
            <Gdrive />
            <div className="h-full bg-white p-4 rounded-md"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

import { getDriveTemplates, getUsers } from "@/lib/data";
import { auth } from "@/lib/auth";
import { getSharedDrives } from "@/lib/gdrive";
import { RiHardDrive2Fill } from "react-icons/ri";
import { PiHardDrivesFill } from "react-icons/pi";
import Gdrive from "@/components/dashboard/Gdrive";

const DashboardPage = async () => {
  // const templates = await getDriveTemplates();
  // const users = await getUsers();
  const { user, accessToken } = await auth();
  // const drives = await getSharedDrives(accessToken);
  // console.log(drives);

  return (
    <main className="m-4">
      <div className="h-full grid grid-cols-[1fr_350px] max-md:grid-cols-1 gap-4">
        <div className="h-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            Hello there,{" "}
            <span className="text-primary">{user.name} &#128075;</span>
          </h2>
          <div className="h-[250px] grid grid-cols-3 gap-4">
            <div className="h-full bg-white p-4 flex flex-col justify-between rounded-md">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-2 rounded-md">
                  <PiHardDrivesFill className="text-2xl text-white" />
                </div>
                <p className="text-2xl font-semibold">Shared Drives</p>
              </div>
              <p className="text-end font-bold text-xl">2,400</p>
            </div>
            <div className="h-full bg-white p-4 rounded-md"></div>
            <div className="h-full bg-white p-4 rounded-md"></div>
          </div>
          <div className="h-[250px] flex flex-col gap-4">
            <div className="w-full flex justify-between">
              <h2 className="text-md font-semibold">New Drives</h2>
              <h2 className="text-sm hover:text-primary transition-colors">
                See More
              </h2>
            </div>
            <div className="h-full grid grid-cols-5 gap-4">
              <div className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                <RiHardDrive2Fill />
                Drive
              </div>
              <div className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                <RiHardDrive2Fill />
                Drive
              </div>
              <div className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                <RiHardDrive2Fill />
                Drive
              </div>
              <div className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                <RiHardDrive2Fill />
                Drive
              </div>
              <div className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                <RiHardDrive2Fill />
                Drive
              </div>
              <div className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary transition-all cursor-pointer">
                <RiHardDrive2Fill />
                Drive
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-4">
            <h2 className="text-md font-semibold">New Templates</h2>
            <div className="h-full w-full bg-white rounded-md"></div>
          </div>
        </div>
        <div className="bg-white h-full flex flex-col gap-4 rounded-md">
          <Gdrive />
          <div className=""></div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

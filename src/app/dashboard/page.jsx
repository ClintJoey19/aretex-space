import { getDriveTemplates, getUsers } from "@/lib/data";
import { LuFolderKanban } from "react-icons/lu";
import Gdrive from "@/components/dashboard/Gdrive";
import Cards from "@/components/dashboard/dashboard-content/Cards";
import RecentDrives from "@/components/dashboard/dashboard-content/RecentDrives";
import { getServerSession } from "next-auth";
import { useMediaQuery } from "@mantine/hooks";

const DashboardPage = async () => {
  const templates = await getDriveTemplates();
  const users = await getUsers();
  const { user } = await getServerSession();

  return (
    <main className="m-4 overflow-hidden">
      <div className="h-full grid grid-cols-[1fr_300px] max-xl:grid-cols-1 gap-4">
        <div className="h-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            Hello there,{" "}
            <span className="text-primary">{user.name} &#128075;</span>
          </h2>
          <Cards users={users} templates={templates} />
          <div className="h-[250px] flex flex-col gap-4">
            <div className="w-full flex justify-between">
              <h2 className="text-md font-semibold">New Drives</h2>
              <h2 className="text-sm hover:text-primary transition-colors">
                See More
              </h2>
            </div>
            <RecentDrives />
          </div>
          <MyTemplates />
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

async function MyTemplates() {
  const myTemp = await getDriveTemplates();
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="text-md font-semibold">My Templates</h2>
      <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 gap-4">
        {myTemp.map((temp) => (
          <div
            key={temp._id}
            className="bg-white rounded-md p-2 flex items-center gap-4 border-2 border-transparent hover:border-primary transition-colors"
          >
            <div className="p-1 bg-primary rounded-sm">
              <LuFolderKanban className="text-white" />
            </div>{" "}
            {temp.name.length > 8 ? `${temp.name.slice(0, 8)}...` : temp.name}
          </div>
        ))}
      </div>
    </div>
  );
}

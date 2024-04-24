import { getDriveTemplates, getUsers } from "@/lib/data";
import { auth } from "@/lib/auth";
import { getSharedDrives } from "@/lib/gdrive";
import { PiHardDrivesFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi2";
import { HiPuzzlePiece } from "react-icons/hi2";
import Gdrive from "@/components/dashboard/Gdrive";
import Drive from "@/components/dashboard/Drive";

const DashboardPage = async () => {
  const templates = await getDriveTemplates();
  const users = await getUsers();
  const { user, accessToken } = await auth();
  const { nextPageToken, drives } = await getSharedDrives(accessToken);
  const cards = [
    {
      name: "Shared Drives",
      icon: PiHardDrivesFill,
      count: drives.length,
    },
    {
      name: "Users",
      icon: HiUserGroup,
      count: users.length,
    },
    {
      name: "Templates",
      icon: HiPuzzlePiece,
      count: templates.length,
    },
  ];

  return (
    <main className="m-4">
      <div className="h-full grid grid-cols-[1fr_350px] max-md:grid-cols-1 gap-4">
        <div className="h-full flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">
            Hello there,{" "}
            <span className="text-primary">{user.name} &#128075;</span>
          </h2>
          <Cards cards={cards} />
          <div className="h-[250px] flex flex-col gap-4">
            <div className="w-full flex justify-between">
              <h2 className="text-md font-semibold">New Drives</h2>
              <h2 className="text-sm hover:text-primary transition-colors">
                See More
              </h2>
            </div>
            <RecentDrives drives={drives} />
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

function Cards({ cards }) {
  return (
    <div className="h-[250px] grid grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div className="h-full bg-white p-4 flex flex-col justify-between rounded-md">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2 rounded-md">
              <card.icon className="text-2xl text-white" />
            </div>
            <p className="text-xl font-semibold">{card.name}</p>
          </div>
          <p className="text-end font-bold text-xl">{card.count}</p>
        </div>
      ))}
    </div>
  );
}

function RecentDrives({ drives }) {
  return (
    <div className="h-full grid grid-cols-5 gap-4">
      {drives.map((drive, i) => (
        <Drive key={i} drive={drive} />
      ))}
    </div>
  );
}

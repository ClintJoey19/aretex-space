import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
  const { user } = await getServerSession();

  return (
    <main className="m-4 overflow-hidden">
      <div className="h-full w-full">
        <div className="h-full flex flex-col gap-4 relative">
          <h2 className="text-2xl font-semibold">
            Hello there,{" "}
            <span className="text-primary">{user.name} &#128075;</span>
          </h2>
          <Image src="dashboard-hero.svg" alt="dashboard-hero" fill />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

import { DataTableDemo } from "@/components/dashboard/DataTable";
import { auth } from "@/lib/auth";
import { getSharedDrives } from "@/lib/gdrive";

const SharedDrives = async () => {
  // const { accessToken } = await auth();
  // const { nextPageToken, drives } = await getSharedDrives(accessToken);
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4" suppressHydrationWarning={true}>
        <h2 className="text-2xl">Shared Drives</h2>
        <DataTableDemo />
      </div>
    </main>
  );
};

export default SharedDrives;

import { DataTableDemo } from "@/components/dashboard/DataTable";

async function getDrives() {
  const res = await fetch("http://localhost:3000/api/dashboard/shared-drive");

  return res;
}

const SharedDrives = async () => {
  const drives = await getDrives();
  const data = await drives.json();
  console.log(data);
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Shared Drives</h2>
        <DataTableDemo />
      </div>
    </main>
  );
};

export default SharedDrives;

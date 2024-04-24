"use client";
import { useRouter } from "next/navigation";
import { RiHardDrive2Fill } from "react-icons/ri";

const Drive = ({ drive }) => {
  const { id, name, kind } = drive;
  const router = useRouter();
  return (
    <div
      className="h-full bg-white p-2 rounded-md flex items-center gap-4 border-2 border-transparent hover:border-primary text-sm transition-all cursor-pointer"
      onDoubleClick={() => router.push(`/dashboard/shared-drives/${id}`)}
    >
      <RiHardDrive2Fill />
      {name.length > 7 ? `${name.slice(0, 7)}...` : name}
    </div>
  );
};

export default Drive;

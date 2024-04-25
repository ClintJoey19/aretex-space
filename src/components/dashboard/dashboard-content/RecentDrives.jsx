"use client";
import { useState, useEffect } from "react";
import Drive from "../Drive";
import { DOMAIN } from "@/lib/utils";
import TextSkeleton from "@/components/skeletons/TextSkeleton";

const RecentDrives = () => {
  const [drives, setDrives] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetched = async () => {
      const res = await fetch(`${DOMAIN}/api/dashboard/shared-drive`);
      const { result } = await res.json();
      setDrives(result.sharedDrives);
      setIsFetching(false);
    };
    fetched();
  }, []);

  return (
    <div className="h-full grid grid-cols-5 max-lg:grid-cols-3 gap-4">
      {isFetching
        ? Array(10)
            .fill(0)
            .map((item, i) => <TextSkeleton key={i} className="p-5" />)
        : drives.map((drive) => <Drive key={drive.id} drive={drive} />)}
    </div>
  );
};

export default RecentDrives;

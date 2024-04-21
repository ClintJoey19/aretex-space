"use client";
import { DataTableDemo } from "@/components/dashboard/DataTable";
import CreateDrive from "@/components/global/CreateDrive";
import { useState } from "react";
import { DOMAIN } from "@/lib/utils";

const getDrives = async (nextPageToken = null) => {
  let URL = `${DOMAIN}/api/dashboard/shared-drive`;

  if (nextPageToken) {
    URL += `?nextPageToken=${nextPageToken}`;
  }

  const res = await fetch(URL, { cache: "no-store" });

  if (!res.ok) {
    console.log("Something went wrong");
  }

  return res.json();
};

const SharedDrives = () => {
  const [display, setDisplay] = useState(0);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isFetching, setIsFetching] = useState(true);

  const loadMoreDrives = async () => {
    if (token) {
      setIsFetching(true);
      const res = await getDrives(token);
      const drives = res.result.sharedDrives;
      setData((prev) => [...prev, ...drives]);
      setToken(res.result.newToken);
      setPagination({
        ...pagination,
        pageSize: pagination.pageSize + drives.length,
      });
      setIsFetching(false);
    } else {
      const res = await getDrives();
      setData(res.result.sharedDrives);
      setToken(res.result.newToken);
      setIsFetching(false);
    }
  };

  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full flex gap-3 items-center">
          <h2 className="text-2xl">Shared Drives</h2>
          <CreateDrive />
        </div>
        <DataTableDemo
          display={display}
          setDisplay={setDisplay}
          data={data}
          token={token}
          pagination={pagination}
          setPagination={setPagination}
          isFetching={isFetching}
          loadMoreDrives={loadMoreDrives}
        />
      </div>
    </main>
  );
};

export default SharedDrives;

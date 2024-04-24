"use client";
import DonutGraph from "./graphs/DonutGraph";
import Image from "next/image";
import Legend from "./graphs/Legend";
import { useState, useEffect } from "react";
import DonutSkeleton from "../skeletons/DonutSkeleton";
import TextSkeleton from "../skeletons/TextSkeleton";

const Gdrive = () => {
  const [storage, setStorage] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetched = async () => {
      const res = await fetch("http://localhost:3000/api/dashboard/drive");
      setStorage(await res.json());
      setIsFetching(false);
    };
    fetched();
  }, []);

  const legends = [
    {
      name: "Capacity",
      color: "#36a2eb",
    },
    {
      name: "Usage",
      color: "#ff6384",
    },
    {
      name: "My Drive",
      color: "#fdce4a",
    },
    {
      name: "Trashed",
      color: "#7956ff",
    },
  ];
  return (
    <div className="h-full bg-white flex flex-col gap-2 rounded-md p-4">
      <div className="w-full flex justify-center items-center gap-2">
        <Image
          src="/gdrive-logo.png"
          alt="gdrive-logo"
          height={40}
          width={40}
        />
        <h2 className="text-md text-muted-foreground font-semibold">
          Google Drive
        </h2>
      </div>
      {isFetching ? <DonutSkeleton /> : <DonutGraph storageQuota={storage} />}
      <div className="w-full flex flex-col justify-between gap-2">
        {legends.map((legend, i) =>
          isFetching ? (
            <TextSkeleton key={i} className="w-full h-[24px]" />
          ) : (
            <Legend
              key={i}
              color={legend.color}
              name={legend.name}
              data={storage[i]}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Gdrive;

"use client";
import { useState, useEffect } from "react";
import { PiHardDrivesFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi2";
import { LuFolderKanban } from "react-icons/lu";
import { DOMAIN } from "@/lib/utils";

const getData = async () => {
  const res = await fetch(`${DOMAIN}/api/dashboard`);
  const data = await res.json();
  return data;
};

const Cards = ({ users, templates }) => {
  const [drives, setDrives] = useState([]);

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
      icon: LuFolderKanban,
      count: templates.length,
    },
  ];

  useEffect(() => {
    const fetched = async () => {
      setDrives(await getData());
    };
    fetched();
  }, []);
  return (
    <div className="h-[250px] grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="h-full bg-white p-4 flex flex-col justify-between rounded-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2 rounded-md">
              <card.icon className="text-2xl text-white" />
            </div>
            <p className="text-lg font-semibold">{card.name}</p>
          </div>
          <p className="text-end font-bold text-xl">{card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;

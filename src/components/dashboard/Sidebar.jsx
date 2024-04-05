"use client";
import React from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiHarddrives } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdCloudUpload, MdOutlineGroup } from "react-icons/md";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import CreateDialog from "../global/CreateDialog";

const navLinks = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    text: "Shared Drives",
    href: "/dashboard/shared-drives",
    icon: TfiHarddrives,
  },
  {
    text: "Users",
    href: "/dashboard/users",
    icon: MdOutlineGroup,
  },
  {
    text: "Templates",
    href: "/dashboard/templates",
    icon: LiaProjectDiagramSolid,
  },
];

const Sidebar = () => {
  const path = usePathname();

  let actionBtn = (
    <Button>
      <MdCloudUpload className="text-xl mr-4" /> New
    </Button>
  );

  if (path === "/dashboard/shared-drives") {
    actionBtn = <CreateDialog file="Drive" />;
  }

  if (path === "/dashboard/templates") {
    actionBtn = (
      <Button>
        <Link href="/dashboard/templates/create-template" className="flex">
          <MdCloudUpload className="text-xl mr-4" /> New
        </Link>
      </Button>
    );
  }

  return (
    <section className="h-full flex justify-center bg-white border">
      <div className="w-[80%] h-full flex flex-col gap-2">
        <div className="w-full mt-4">{actionBtn}</div>
        <nav className="w-full">
          <ul className="w-full flex flex-col gap-2 py-2">
            {navLinks.map((item, i) => (
              <li key={i} className="w-full">
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-5 py-2 px-4 ${
                    path === item.href
                      ? "bg-primary hover:bg-primary text-white"
                      : "hover:bg-primary/15"
                  } rounded-sm transition-all`}
                >
                  <item.icon className="text-xl" />
                  <p>{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Sidebar;

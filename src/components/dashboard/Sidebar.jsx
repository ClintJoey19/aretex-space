"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdCloudUpload } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiHarddrive } from "react-icons/tfi";
import { TfiHarddrives } from "react-icons/tfi";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    text: "Personal Drive",
    href: "/dashboard/personal-drive",
    icon: TfiHarddrive,
  },
  {
    text: "Shared Drives",
    href: "/dashboard/shared-drives",
    icon: TfiHarddrives,
  },
];

const Sidebar = () => {
  const path = usePathname();
  return (
    <section className="h-full flex justify-center bg-white border">
      <div className="w-[80%] h-full flex flex-col gap-2">
        <div className="w-full mt-4">
          <Button>
            <MdCloudUpload className="text-xl mr-4" /> Upload
          </Button>
        </div>
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
                  <item.icon />
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

"use client";
import React from "react";
import Link from "next/link";
import { MdCloudUpload } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiHarddrive } from "react-icons/tfi";
import { TfiHarddrives } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { RiFileUploadLine } from "react-icons/ri";
import { MdDriveFolderUpload } from "react-icons/md";
import CreateDialog from "../global/CreateDialog";

const actions = [
  {
    text: "New Folder",
    icon: AiOutlineFolderAdd,
  },
  {
    text: "Upload File",
    icon: RiFileUploadLine,
  },
  {
    text: "Upload Folder",
    icon: MdDriveFolderUpload,
  },
];

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
          {path === "/dashboard/shared-drives" ? (
            <CreateDialog file="Drive" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <MdCloudUpload className="text-xl mr-4" /> Upload
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {actions.map((item, i) => (
                    <DropdownMenuItem key={i} className={`cursor-pointer`}>
                      <item.icon className="mr-4" /> {item.text}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { PiHardDrivesFill } from "react-icons/pi";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MdCloudUpload } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import CreateDrive from "../global/CreateDrive";
import CreateFolder from "../global/CreateFolder";

const navLinks = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: BiSolidDashboard,
  },
  {
    text: "Shared Drives",
    href: "/dashboard/shared-drives",
    icon: PiHardDrivesFill,
  },
  {
    text: "Users",
    href: "/dashboard/users",
    icon: HiUserGroup,
  },
  {
    text: "Templates",
    href: "/dashboard/templates",
    icon: PiTreeStructureFill,
  },
];

const Sidebar = () => {
  const path = usePathname();
  const { id } = useParams();
  const router = useRouter();

  let actionBtn = (
    <Button disabled>
      <MdCloudUpload className="text-xl mr-4" /> New
    </Button>
  );

  if (path === "/dashboard/shared-drives") {
    actionBtn = <CreateDrive file="Drive" />;
  }

  if (path.includes(`/dashboard/shared-drives/${id}`)) {
    actionBtn = <CreateFolder file="Folder" />;
  }

  if (path === "/dashboard/templates") {
    actionBtn = (
      <Button
        onClick={() => router.push("/dashboard/templates/create-template")}
      >
        <MdCloudUpload className="text-xl mr-4" /> New
      </Button>
    );
  }

  return (
    <section className="h-full flex justify-center bg-white border">
      <div className="w-[80%] h-full flex flex-col gap-2">
        <div className="w-full mt-4" suppressHydrationWarning>
          {actionBtn}
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

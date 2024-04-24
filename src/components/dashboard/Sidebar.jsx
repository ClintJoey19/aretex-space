"use client";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { PiHardDrivesFill } from "react-icons/pi";
import { useParams, usePathname } from "next/navigation";
import { HiUserGroup } from "react-icons/hi2";
import { HiPuzzlePiece } from "react-icons/hi2";

const navLinks = [
  {
    text: "Dashboard",
    href: "/dashboard",
    icon: BiSolidDashboard,
    child: [],
  },
  {
    text: "Shared Drives",
    href: "/dashboard/shared-drives",
    icon: PiHardDrivesFill,
    child: [],
  },
  {
    text: "Users",
    href: "/dashboard/users",
    icon: HiUserGroup,
    child: [],
  },
  {
    text: "Templates",
    href: "/dashboard/templates",
    icon: HiPuzzlePiece,
    child: ["create-template", "edit-template"],
  },
];

const Sidebar = () => {
  const path = usePathname();
  const params = useParams();

  return (
    <section className="h-full flex justify-center bg-white border">
      <div className="w-[80%] h-full flex flex-col gap-2">
        <nav className="w-full">
          <ul className="w-full flex flex-col gap-2 py-2">
            {navLinks.map((item, i) => (
              <li key={i} className="w-full">
                <Link
                  href={item.href}
                  className={`w-full flex items-center max-md:justify-center gap-4 py-2 md:px-4 ${
                    path === item.href
                      ? "bg-primary hover:bg-primary text-white"
                      : "hover:bg-primary/15"
                  } text-muted-foreground rounded-sm transition-all`}
                >
                  <item.icon className="text-xl" />
                  <p className="max-md:hidden">{item.text}</p>
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

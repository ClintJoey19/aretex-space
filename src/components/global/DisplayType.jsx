import React from "react";
import { CiViewTable } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { PiTreeStructureThin } from "react-icons/pi";

const icons = [
  {
    icon: CiViewTable,
    href: "/",
  },
  {
    icon: CiGrid41,
    href: "/",
  },
  {
    icon: PiTreeStructureThin,
    href: "/",
  },
];

const DisplayType = ({ display, setDisplay }) => {
  return (
    <div className="border rounded-sm p-1">
      <div className="flex justify-between items-center gap-2">
        {icons.map((item, i) => (
          <div
            onClick={() => setDisplay(i)}
            key={i}
            className={`${
              display === i
                ? "bg-primary text-white hover:bg-primary hover:text-white"
                : "hover:bg-primary/15"
            }  p-1 rounded-sm cursor-pointer`}
          >
            {<item.icon className="h-5 w-5" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayType;

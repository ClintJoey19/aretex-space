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
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

const actions = [
  {
    text: "Manage Members",
    icon: MdOutlineGroup,
  },
  {
    text: "Rename",
    icon: MdOutlineEdit,
  },
  {
    text: "Star",
    icon: MdOutlineStarOutline,
  },
  {
    text: "Move to Trash",
    icon: FaRegTrashCan,
  },
];

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <CiMenuKebab className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
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
  );
}

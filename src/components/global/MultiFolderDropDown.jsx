"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineLink } from "react-icons/md";
import { useToast } from "../ui/use-toast";

const MultiFolderDropDown = ({ table }) => {
  let rowsSelected = table.getFilteredSelectedRowModel().rows;
  const { toast } = useToast();

  const handleCopyLinks = () => {
    const links = rowsSelected.map(
      (row) =>
        `http://localhost:3000/dashboard/shared-drives/${row.original.id}`
    );

    navigator.clipboard.writeText(links.join("\n"));
    toast({
      description: `${links.length} ${
        links.length > 1 ? "links" : "link"
      } copied.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <CiMenuKebab className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleCopyLinks()}>
            <MdOutlineLink className="mr-4" /> Copy{" "}
            {rowsSelected.length > 1 ? "Links" : "Link"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiFolderDropDown;

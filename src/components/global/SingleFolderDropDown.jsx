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
import { DOMAIN } from "@/lib/utils";

const SingleFolderDropDown = ({ row, table }) => {
  let rowsSelected = table.getFilteredSelectedRowModel().rows;
  const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          disabled={rowsSelected.length > 1 ? true : false}
        >
          <CiMenuKebab className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(
                `${DOMAIN}/shared-drives/${row.id}`
              );
              toast({
                description: "Link copied.",
              });
            }}
          >
            <MdOutlineLink className="mr-4" /> Copy Link
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SingleFolderDropDown;

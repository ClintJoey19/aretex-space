import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DropdownMenuTableActions } from "@/components/global/DropDownTableActions";
import { actions } from "@/components/dashboard/shared-drive/DriveActions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "members",
    header: () => <div className="text-right">Members</div>,
    cell: ({ row }) => {
      const members = row.getValue("members").length;

      return (
        <div className="text-right font-medium">
          {members} {members > 1 ? "members" : "member"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const rowSelected = table.getFilteredSelectedRowModel().rows.length;

      return (
        <DropdownMenuTableActions
          path="shared-drives"
          row={row.original}
          actions={actions}
          rowSelected={rowSelected}
        />
      );
    },
  },
];

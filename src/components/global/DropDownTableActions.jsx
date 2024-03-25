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

export function DropdownMenuTableActions({ path, row, actions, rowSelected }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {rowSelected > 1 ? (
          <Button variant="outline" size="icon" disabled>
            <CiMenuKebab className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="icon">
            <CiMenuKebab className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {actions.map((item, i) => (
            <DropdownMenuItem
              key={i}
              className={`cursor-pointer`}
              onClick={() => item.fn({ path, id: row.id })}
            >
              <item.icon className="mr-4" /> {item.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

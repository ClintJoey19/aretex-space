"use client";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineGroup } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";

const SingleDropDownActions = ({ row, table }) => {
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("");
  const session = useSession();
  const { toast } = useToast();
  let rowsSelected = table.getFilteredSelectedRowModel().rows;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const peoples = emails.split(", ");

    peoples.forEach(async (people) => {
      try {
        const URL =
          "https://aretex-space.vercel.app/api/dashboard/shared-drive/manage-members"; // production
        // const URL =
        //   "https://cheerful-cat-3fcb8b.netlify.app/api/dashboard/shared-drive/manage-members"; // production
        // const URL =
        //   "http://localhost:3000/api/dashboard/shared-drive/manage-members";
        const res = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({ driveId: row.id, email: people, role: role }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.data.accessToken}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          toast({
            title: "Success",
            description: `${people} is added to drive`,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    });
    setEmails("");
    setRole("");
  };
  return (
    <Dialog>
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
        <DropdownMenuContent className="w-full" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger>
              <DropdownMenuItem>
                <MdOutlineGroup className="mr-4" />
                Manage Members
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-2">
            <Textarea
              id="email"
              placeholder="Add Emails"
              className="col-span-4"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              required
            />
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="reader">Viewer</SelectItem>
                  <SelectItem value="commenter">Commenter</SelectItem>
                  <SelectItem value="writer">Contributor</SelectItem>
                  <SelectItem value="fileOrganizer">Content Manager</SelectItem>
                  <SelectItem value="organizer">Manager</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SingleDropDownActions;

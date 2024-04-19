"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManageMembers from "../dashboard/ManageMembers";
import ManageDelete from "../dashboard/ManageDelete";
import { CiMenuKebab } from "react-icons/ci";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { MdPeopleOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export function DropdownMenuTableActions({ table }) {
  const [isManageMembersDialogOpen, setIsManageMembersDialogOpen] =
    useState(false);
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("");
  const session = useSession();
  const { toast } = useToast();
  let rowsSelected = table.getFilteredSelectedRowModel().rows;

  const addMembers = async (e) => {
    e.preventDefault();
    const peoples = emails.split(", ");

    for (const row of rowsSelected) {
      let driveId = row.original.id;

      peoples.forEach(async (people) => {
        try {
          // const URL =
          //   "https://aretex-space.vercel.app/api/dashboard/shared-drive/manage-members"; // production
          // const URL =
          //   "https://cheerful-cat-3fcb8b.netlify.app/api/dashboard/shared-drive/manage-members"; // production
          const URL =
            "http://localhost:3000/api/dashboard/shared-drive/manage-members";
          const res = await fetch(URL, {
            method: "POST",
            body: JSON.stringify({ driveId, email: people, role: role }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.data.accessToken}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            console.log(data);
            toast({
              title: "Success",
              description: `${people} is added to drive`,
            });
          } else {
            const data = await res.json();
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
    }
    setEmails("");
    setRole("");
  };

  const deletFile = async () => {
    for (const row of rowsSelected) {
      try {
        const URL = "http://localhost:3000/api/dashboard/shared-drive";
        const id = row.original.id;
        const res = await fetch(`${URL}/${id}`, {
          method: "DELETE",
          body: JSON.stringify({ driveId: id }),
          headers: {
            Authorization: `Bearer ${session.data.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (res.ok) {
          toast({
            title: "Success",
            description: "Drive deleted.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete drive.",
          });
        }
        setIsDeleteAlertDialogOpen(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <CiMenuKebab className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setIsManageMembersDialogOpen(true)}
            >
              <MdPeopleOutline className="mr-4" /> Manage Members
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDeleteAlertDialogOpen(true)}>
              <RiDeleteBin6Line className="mr-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ManageMembers
        isManageMembersDialogOpen={isManageMembersDialogOpen}
        setIsManageMembersDialogOpen={setIsManageMembersDialogOpen}
        emails={emails}
        setEmails={setEmails}
        role={role}
        setRole={setRole}
        addMembers={addMembers}
      />
      <ManageDelete
        isDeleteAlertDialogOpen={isDeleteAlertDialogOpen}
        setIsDeleteAlertDialogOpen={setIsDeleteAlertDialogOpen}
        deletFile={deletFile}
      />
    </>
  );
}

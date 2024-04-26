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
import { DOMAIN } from "@/lib/utils";

export function DropdownMenuTableActions({ table }) {
  const [isManageMembersDialogOpen, setIsManageMembersDialogOpen] =
    useState(false);
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const { toast } = useToast();
  let rowsSelected = table.getFilteredSelectedRowModel().rows;

  const addMembers = async (peoples) => {
    for (const row of rowsSelected) {
      let driveId = row.original.id;

      for (const people of peoples) {
        try {
          const URL = `${DOMAIN}/api/dashboard/shared-drive/manage-members`;
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
      }
    }
    setIsSubmitting(false);
    location.reload();
  };

  const deletFiles = async () => {
    for (const row of rowsSelected) {
      try {
        const URL = `${DOMAIN}/api/dashboard/shared-drive`;
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
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleAddMembers = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const peoples = emails.split(", ");
    await addMembers(peoples);

    setIsSubmitting(false);
    setIsManageMembersDialogOpen(false);
    location.reload();
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    await deletFiles();
    setIsSubmitting(false);
    setIsDeleteAlertDialogOpen(false);
    location.reload();
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
        addMembers={handleAddMembers}
        isSubmitting={isSubmitting}
      />
      <ManageDelete
        isDeleteAlertDialogOpen={isDeleteAlertDialogOpen}
        setIsDeleteAlertDialogOpen={setIsDeleteAlertDialogOpen}
        deletFile={handleDelete}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

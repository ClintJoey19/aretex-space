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
import { CiMenuKebab } from "react-icons/ci";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ManageMembers from "../dashboard/ManageMembers";
import ManageDelete from "../dashboard/ManageDelete";
import { MdPeopleOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Spinner from "./Spinner";
import { DOMAIN, pauseForOneSecond } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SingleDropDownActions = ({ row, table }) => {
  // MENU ITEMS
  const [isManageMembersDialogOpen, setIsManageMembersDialogOpen] =
    useState(false);
  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("");
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  let rowsSelected = table.getFilteredSelectedRowModel().rows;

  const addMembers = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const peoples = emails.split(", ");

    for (const people of peoples) {
      try {
        const URL = `${DOMAIN}/api/dashboard/shared-drive/manage-members`;
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
          setEmails("");
          setRole("");
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        }
        //avoid google's rate limiter
        await pauseForOneSecond();
      } catch (err) {
        console.error(err.message);
      }
    }

    setIsSubmitting(false);
    location.reload();
  };

  const deletFile = async () => {
    setIsSubmitting(true);
    try {
      const URL = `${DOMAIN}/api/dashboard/shared-drive`;
      const id = row.id;
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
      setIsSubmitting(false);
      setIsDeleteAlertDialogOpen(false);
      location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
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
        isSubmitting={isSubmitting}
      />
      <ManageDelete
        isDeleteAlertDialogOpen={isDeleteAlertDialogOpen}
        setIsDeleteAlertDialogOpen={setIsDeleteAlertDialogOpen}
        deletFile={deletFile}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default SingleDropDownActions;

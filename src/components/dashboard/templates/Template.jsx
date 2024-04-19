"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuFolderKanban } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTemplate } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const Template = ({ template }) => {
  const id = template._id.toString();
  const { toast } = useToast();

  const handleDelete = async (id) => {
    const res = await deleteTemplate(id);

    if (res) {
      toast({
        title: "Delete Success",
        description: "Drive Template was deleted.",
      });
      return;
    }

    toast({
      variant: "destructive",
      title: "Error",
      description: "Error deleting drive template.",
    });
  };

  return (
    <div className="h-full flex justify-between items-center rounded-md overflow-hidden border border-primary/15 hover:shadow-md transition-all">
      <div className="h-full flex gap-2 items-center">
        <div className="w-12 h-full bg-primary flex justify-center items-center">
          <LuFolderKanban className="text-white text-xl" />
        </div>
        <div className="py-1 px-2">
          <p>{template.name}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center py-1 px-2">
        <Button variant="outline" size="icon">
          <Link
            className="w-full h-full flex items-center justify-center"
            href={`/dashboard/templates/edit-template/${id}`}
          >
            <FiEdit />
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <RiDeleteBin6Line />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                drive template's data from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Template;

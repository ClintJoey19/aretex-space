"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdCloudUpload } from "react-icons/md";

const CreateDialog = ({ file }) => {
  const title = `New ${file}`;
  return (
    <Dialog>
      <DialogTrigger>
        {file === "Folder" ? (
          <MdCloudUpload className="text-xl mr-4" />
        ) : (
          <Button>
            <MdCloudUpload className="text-xl mr-4" /> Upload
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="name" className="col-span-3" placeholder={title} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;

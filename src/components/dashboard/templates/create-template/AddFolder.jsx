import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiAddLine } from "react-icons/ri";
import { useState } from "react";

const AddFolder = ({ parentKey, template, onAddFolder }) => {
  const [newFolder, setNewFolder] = useState("");

  const handleSubmit = () => {
    onAddFolder(parentKey, newFolder);
    setNewFolder("");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <RiAddLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Folder</DialogTitle>
          <DialogDescription>
            Make changes to your drive template here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <main>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="">
                Parent
              </Label>
              <Input
                id="name"
                value={template.name}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="folderName" className="">
                Name
              </Label>
              <Input
                id="folderName"
                className="col-span-3"
                placeholder="Folder Name"
                value={newFolder}
                required
                onChange={(e) => setNewFolder(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>
              <RiAddLine className="mr-2" /> Add
            </Button>
          </DialogFooter>
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default AddFolder;

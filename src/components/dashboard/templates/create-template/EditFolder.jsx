import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditFolder = ({ template, onEditFolder }) => {
  const [newName, setNewName] = useState(template.name);

  const handleSubmit = () => {
    // console.log(template.name, { newName });
    onEditFolder(template.name, newName);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MdEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Folder</DialogTitle>
        </DialogHeader>
        <main>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newName" className="">
                Name
              </Label>
              <Input
                id="newName"
                className="col-span-3"
                placeholder="Folder Name"
                value={newName}
                required
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogFooter>
        </main>
      </DialogContent>
    </Dialog>
  );
};

export default EditFolder;

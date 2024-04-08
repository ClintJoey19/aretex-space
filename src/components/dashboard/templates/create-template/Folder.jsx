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

const Folder = ({ template, onAddFolder }) => {
  const [newFolder, setNewFolder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFolder(template.name, newFolder);
    setNewFolder("");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 py-1 px-4 rounded-md">
        <div className="flex items-center gap-2 cursor-pointer">
          <p className={template.name === "Parent" ? "text-primary" : ""}>
            {template.name}
          </p>
        </div>
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
                Make changes to your drive template here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <form action="" onSubmit={handleSubmit}>
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
                <Button type="submit">
                  <RiAddLine className="mr-2" /> Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="ml-[40px]">
        {template.children.map((temp) => (
          <Folder key={temp.name} template={temp} onAddFolder={onAddFolder} />
        ))}
      </div>
    </div>
  );
};

export default Folder;

import { DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import CustomSelect from "@/components/global/CustomSelect";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiFolder } from "react-icons/hi";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const GroupFolderTab = ({ file, parentId, templates }) => {
  const title = `New ${file}s`;
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [folders, setFolders] = useState([]);
  const { toast } = useToast();
  const router = useRouter();

  const addFolder = () => {
    if (name && template) {
      const newFolder = {
        name,
        template,
      };

      setFolders((prev) => [...prev, newFolder]);
      setName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (folders.length === 0) {
      return;
    }

    const URL = "http://localhost:3000/api/dashboard/files";

    for (const folder of folders) {
      const res = await fetch(`${URL}/${parentId}`, {
        method: "POST",
        body: JSON.stringify(folder),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: `${folder.name} folder is created.`,
          action: (
            <ToastAction
              altText="Open"
              onClick={() =>
                router.push(`/dashboard/shared-drives/${data.data.id}`)
              }
            >
              Open
            </ToastAction>
          ),
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create folder.",
        });
      }
    }

    setFolders([]);
  };
  return (
    <div className="flex flex-col gap-4">
      <DialogTitle className="mt-2">{title}</DialogTitle>
      <div className="grid grid-cols-4 gap-4">
        <div className="grid grid-cols-1 col-span-3 items-center gap-2">
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Folder Name"
            required
          />
          <CustomSelect
            title="Template"
            items={templates}
            data={template}
            setData={setTemplate}
          />
        </div>
        <DialogFooter>
          <Button onClick={addFolder}>Add</Button>
        </DialogFooter>
      </div>
      {folders.length !== 0 && <Separator />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto p-2">
          {folders.map((folder, i) => (
            <div key={i} className="flex justify-between">
              <div className="flex items-center gap-2">
                <HiFolder className="text-lg" />
                <p>
                  {folder.name.length > 18
                    ? `${folder.name.slice(0, 18)}...`
                    : folder.name}
                </p>
              </div>
              <Select
                value={folders[i].template}
                onValueChange={(value) => {
                  setFolders((prev) =>
                    prev.map((folder, k) =>
                      i === k ? { ...folder, template: value } : folder
                    )
                  );
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Template</SelectLabel>
                    {templates.map((item, i) => (
                      <SelectItem key={item._id ?? i} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="submit">Generate</Button>
        </div>
      </form>
    </div>
  );
};

export default GroupFolderTab;
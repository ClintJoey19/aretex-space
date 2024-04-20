import { DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CustomSelect from "@/components/global/CustomSelect";
import { DOMAIN } from "@/lib/utils";

const SingleFolderTab = ({ file, parentId, templates }) => {
  const title = `New ${file}`;
  const [folderName, setFolderName] = useState("");
  const [template, setTemplate] = useState("");
  const { toast } = useToast();

  const handleSubmitDrive = async (e) => {
    e.preventDefault();

    if (!folderName && !template) {
      return;
    }

    const newFolder = {
      name: folderName,
      template,
    };

    let URL = `${DOMAIN}/api/dashboard/files`;
    const res = await fetch(`${URL}/${parentId}`, {
      method: "POST",
      body: JSON.stringify(newFolder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast({
        variants: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
      return;
    }

    const data = await res.json();
    console.log(data);
    toast({
      title: "Success",
      description: `${newFolder.name} folder is created.`,
    });

    setFolderName("");
    setTemplate("");
  };
  return (
    <form onSubmit={handleSubmitDrive}>
      <DialogTitle className="mt-4">{title}</DialogTitle>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 items-center gap-2">
          <Input
            id="name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
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
      </div>
      <DialogFooter>
        <Button>Generate</Button>
      </DialogFooter>
    </form>
  );
};

export default SingleFolderTab;

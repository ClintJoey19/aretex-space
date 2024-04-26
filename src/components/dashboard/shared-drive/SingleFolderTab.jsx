import { DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import CustomSelect from "@/components/global/CustomSelect";
import Spinner from "@/components/global/Spinner";
import { DOMAIN } from "@/lib/utils";

const SingleFolderTab = ({ parentId, templates }) => {
  const title = `New Folder`;
  const [folderName, setFolderName] = useState("");
  const [template, setTemplate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitDrive = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!folderName && !template) {
      setIsSubmitting(false);
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
    setIsSubmitting(false);
    location.reload();
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
      <DialogFooter className="flex justify-end items-center gap-2">
        {isSubmitting && <Spinner className="w-6 h-6" />}
        <Button disabled={isSubmitting}>Generate</Button>
      </DialogFooter>
    </form>
  );
};

export default SingleFolderTab;

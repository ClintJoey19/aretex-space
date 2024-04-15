"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Folder from "@/components/dashboard/templates/create-template/Folder";

const EditTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [template, setTemplate] = useState({
    root: {
      name: "Parent",
      mimeType: "drive",
      children: {},
    },
  });
  const { id } = useParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newTemplate = { name: templateName, template };
    // console.log(newTemplate);
    // const res = await addTemplate(newTemplate);

    // if (res) {
    //   router.push("/dashboard/templates");
    // }
  };

  return (
    <form
      className="m-2 bg-white rounded-md border flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Create Template</h2>
        <div className="grid grid-cols-4 w-[500px] items-center">
          <Label htmlFor="templateName" className="">
            Template Name
          </Label>
          <Input
            id="templateName"
            placeholder="Template Name"
            name="templateName"
            className="col-span-2"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </div>

        <div className="h-[56vh] border border-primary/50 w-full p-2 rounded-md overflow-auto">
          <div>
            <Folder
              parentKey={Object.keys(template)[0]}
              template={template.root}
              // onAddFolder={handleAddFolder}
              // onEditFolder={handleEditFolder}
              // onDeleteFolder={handleDeleteFolder}
            />
          </div>
        </div>
        <div className="w-full flex justify-end gap-4">
          <Button>Create</Button>
        </div>
      </div>
    </form>
  );
};

export default EditTemplate;

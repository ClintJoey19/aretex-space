"use client";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Folder from "@/components/dashboard/templates/create-template/Folder";
import { addTemplate } from "@/lib/data";
import { useRouter } from "next/navigation";

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [template, setTemplate] = useState({
    root: {
      name: "Parent",
      mimeType: "drive",
      children: {},
    },
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTemplate = { name: templateName, template };
    console.log(newTemplate);
    const res = await addTemplate(newTemplate);

    if (res) {
      router.push("/dashboard/templates");
    }
  };

  const findParentByKey = (node, key) => {
    if (key === "root") {
      return node;
    }
    if (node.children[key]) {
      return node.children[key];
    } else {
      for (const childKey in node.children) {
        const found = findParentByKey(node.children[childKey], key);
        if (found) return found;
      }
    }
    return null;
  };

  const handleAddFolder = (parentKey, newFolderName) => {
    const parent = findParentByKey(template.root, parentKey);
    if (parent) {
      const newFolderKey = uuid();
      const newFolder = {
        [newFolderKey]: {
          name: newFolderName,
          mimeType: "application/vnd.google-apps.folder",
          children: {},
        },
      };
      parent.children = { ...parent.children, ...newFolder };
      setTemplate({ ...template });
    }
    console.log(template);
  };

  const handleEditFolder = (parentName, newFolderName) => {
    // pending
    console.log(parentName, newFolderName);
  };

  const handleDeleteFolder = (parentName) => {
    // pending
    console.log(parentName);
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
              onAddFolder={handleAddFolder}
              onEditFolder={handleEditFolder}
              onDeleteFolder={handleDeleteFolder}
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

export default CreateTemplate;

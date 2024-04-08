"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FolderStructure from "@/components/dashboard/templates/create-template/FolderStructure";

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [template, setTemplate] = useState({
    name: "Parent",
    mimeType: "drive",
    children: [],
  });

  const handleAddFolder = (parentName, newFolderName) => {
    const updatedTemplate = { ...template };

    const findAndAddFolder = (folder) => {
      if (folder.name === parentName) {
        folder.children.push({
          name: newFolderName,
          mimeType: "application/vnd.google-apps.folder",
          children: [],
        });
        return;
      }
      folder.children.forEach((child) => findAndAddFolder(child));
    };
    findAndAddFolder(updatedTemplate);
    setTemplate(updatedTemplate);
  };
  return (
    <main className="m-2 bg-white rounded-md border flex flex-col gap-4">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Create Template</h2>
        <div className="grid grid-cols-4 w-[500px] items-center">
          <Label htmlFor="templateName" className="">
            Template Name
          </Label>
          <Input
            id="templateName"
            placeholder="Template Name"
            className="col-span-2"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </div>

        <div className="h-[56vh] border border-primary/50 w-full p-2 rounded-md overflow-auto">
          <FolderStructure template={template} onAddFolder={handleAddFolder} />
        </div>
        <div className="w-full flex justify-end gap-4">
          <Button onClick={() => console.log({ name: templateName, template })}>
            Create
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreateTemplate;

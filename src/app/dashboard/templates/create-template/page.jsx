"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Folder from "@/components/dashboard/templates/create-template/Folder";

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [template, setTemplate] = useState({
    name: "Parent",
    mimeType: "drive",
    children: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTemplate = { name: templateName, template };
    console.log(newTemplate);
    // console.log(session.data.accessToken);
    try {
      const response = await fetch(
        "http://localhost:3000/api/dashboard/templates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: templateName,
            template,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        return;
      }

      console.error(`Error saving template: ${response.statusText}`);
    } catch (err) {
      console.error(err.message);
    }
  };

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
              template={template}
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

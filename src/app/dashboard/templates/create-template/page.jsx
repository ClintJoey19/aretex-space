"use client";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Folder from "@/components/dashboard/templates/create-template/Folder";
import { addTemplate } from "@/lib/data";

const findParent = (temp, parentId) => {
  for (key in temp) {
    if (key === parentId) {
      return temp;
    }
  }
  return null;
};

const CreateTemplate = () => {
  const [templateName, setTemplateName] = useState("");
  const [template, setTemplate] = useState({
    name: "Parent",
    mimeType: "drive",
    children: {
      uuid1: {
        name: "Folder 1",
        mimeType: "folder",
        children: {},
      },
      uuid2: {
        name: "Folder 2",
        mimeType: "folder",
        children: {
          uuid1: {
            name: "Sub Folder 1",
            mimeType: "folder",
            children: {},
          },
          uuid2: {
            name: "Sub Folder 2",
            mimeType: "folder",
            children: {},
          },
        },
      },
      uuid3: {
        name: "Folder 3",
        mimeType: "folder",
        children: {},
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTemplate = { name: templateName, template };
    console.log(newTemplate);
    const res = await addTemplate(newTemplate);
  };

  function handleAddFolder(parentObj, newFolderName) {
    console.log(parentObj);
    // const parent = findParent(parentObj, parentObj);
    // console.log(parent);

    // const newFolderUuid = uuid();
    // console.log(newFolderUuid);
    // if (parent) {
    // parent.children[newFolderUuid] = {
    //   id: newFolderUuid,
    //   name: newFolderName,
    //   mimeType: "folder",
    //   children: {},
    // };
    // setData((prevData) => ({ ...prevData }));
    // }
  }

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

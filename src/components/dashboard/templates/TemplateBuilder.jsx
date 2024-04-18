"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Folder from "./create-template/Folder";
import { addTemplate } from "@/lib/data";

const sample = {
  root: {
    name: "Parent",
    mimeType: "drive",
    children: {},
  },
};

const TemplateBuilder = ({ id, type, name, temp }) => {
  const [templateName, setTemplateName] = useState(name || "");
  const [template, setTemplate] = useState(sample);
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

  const findParentIdById = (structure, targetFolderId) => {
    const traverse = (node, parentId) => {
      for (const childId in node) {
        const child = node[childId];
        if (childId === targetFolderId) {
          return parentId;
        }
        if (child.children && typeof child.children === "object") {
          const result = traverse(child.children, childId);
          if (result) return result;
        }
      }
      return null;
    };

    return traverse(structure, "root");
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
  };

  const handleEditFolder = (parentKey, newFolderName) => {
    const parent = findParentByKey(template.root, parentKey);

    if (parent) {
      parent.name = newFolderName;
      setTemplate({ ...template });
    }
  };

  console.log(template);

  const handleDeleteFolder = (folderId) => {
    const parentId = findParentIdById(template, folderId);
    console.log(parentId);

    setTemplate((prevStructure) => {
      const updatedStructure = { ...prevStructure };

      // Function to recursively search for and remove the folder
      const removeFolder = (parent, idToRemove) => {
        if (parent.children[idToRemove]) {
          delete parent.children[idToRemove]; // Remove the folder if found
          return true; // Indicate that the folder was found and removed
        } else {
          // If the folder is not found in the current level, recursively search in children
          for (const childId in parent.children) {
            const child = parent.children[childId];
            if (child.mimeType === "folder") {
              if (removeFolder(child, idToRemove)) {
                return true; // If folder was found and removed in child, exit recursion
              }
            }
          }
        }
        return false; // Indicate that the folder was not found
      };

      // Check if the parent is root
      if (parentId === "root") {
        // Iterate over root's children directly
        removeFolder(updatedStructure.root, folderId);
      } else {
        // Iterate over the children of the specified parent
        const parentFolder = updatedStructure.root.children[parentId];
        if (parentFolder && parentFolder.children) {
          removeFolder(parentFolder, folderId);
        }
      }

      return updatedStructure;
    });
  };

  return (
    <main className="m-2 bg-white rounded-md border flex flex-col gap-4">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl capitalize">{type} Template</h2>
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
          <Button className="capitalize" onClick={handleSubmit}>
            {type === "create" ? "create" : "update"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default TemplateBuilder;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/global/Spinner";
import Folder from "./create-template/Folder";
import { addTemplate, editTemplate } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const sample = {
  root: {
    name: "Parent",
    mimeType: "drive",
    children: {},
  },
};

const TemplateBuilder = ({ id, type, name, temp, userId }) => {
  const [templateName, setTemplateName] = useState(name || "");
  const [template, setTemplate] = useState(temp ? temp : sample);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const newTemplate = { name: templateName, template: template };

    const res =
      type === "create"
        ? await addTemplate(newTemplate, userId)
        : await editTemplate(id, newTemplate, userId);

    if (res) {
      toast({
        title: "Success",
        description: `Template was ${
          type === "create" ? "created" : "updated"
        } successfully.`,
      });
      setTemplateName("");
      setTemplate({ ...template, sample });
      setIsSubmitting(false);
      router.push("/dashboard/templates");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: `There was an error ${
          type === "create" ? "creating" : "updating"
        } the template.`,
      });
      setIsSubmitting(false);
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
  };

  const handleEditFolder = (parentKey, newFolderName) => {
    const parent = findParentByKey(template.root, parentKey);

    if (parent) {
      parent.name = newFolderName;
      setTemplate({ ...template });
    }
  };

  const findAndRemoveFolder = (structure, targetFolderId) => {
    if (!structure.children) return false; // No children to search

    for (const childId in structure.children) {
      const child = structure.children[childId];
      if (childId === targetFolderId) {
        delete structure.children[childId];
        return true;
      }
      const removedInChild = findAndRemoveFolder(child, targetFolderId);
      if (removedInChild) return true;
    }

    return false;
  };

  const handleDeleteFolder = (folderId) => {
    setTemplate((prevStructure) => {
      const updatedStructure = { ...prevStructure };

      // Function to recursively search for and remove the folder
      findAndRemoveFolder(updatedStructure.root, folderId);

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
        <div className="h-[62vh] min-w-[500px] border border-primary/50 w-full p-2 rounded-md overflow-auto">
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
        <div className="w-full flex items-center justify-end gap-2">
          {isSubmitting && <Spinner className="w-6 h-6" />}
          <Button
            className="capitalize"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {type === "create" ? "create" : "update"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default TemplateBuilder;

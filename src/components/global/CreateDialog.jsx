"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MdCloudUpload } from "react-icons/md";
import { useState } from "react";
import { CreateDrive } from "./CreateDrive";

const lists = [
  {
    id: 1,
    name: "Template 1",
  },
  {
    id: 2,
    name: "Template 2",
  },
  {
    id: 3,
    name: "Template 3",
  },
  {
    id: 4,
    name: "Template 4",
  },
];

const CreateDialog = ({ file }) => {
  const title = `New ${file}`;
  const [templates, setTemplates] = useState(lists);
  const [drive, setDrive] = useState({
    name: "Drive",
    template: 1,
  });

  // fetch here the templates from the db

  const handleSubmitDrive = (e) => {
    e.preventDefault();
    console.log(drive);
    // pending
  };

  let content = (
    <CreateDrive
      handleSubmitDrive={handleSubmitDrive}
      title={title}
      templates={templates}
    />
  );
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <MdCloudUpload className="text-xl mr-4" /> New
        </Button>
      </DialogTrigger>
      {content}
    </Dialog>
  );
};

export default CreateDialog;

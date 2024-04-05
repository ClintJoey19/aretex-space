"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileElement } from "@/components/dashboard/templates/FileElement";

const CreateTemplate = () => {
  const [template, setTemplate] = useState({
    drive: "root",
    kind: "drive",
    children: [],
  });
  return (
    <main className="m-2 bg-white rounded-md border flex flex-col gap-4">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Create Template</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
          repellendus, numquam sequi, et reprehenderit laudantium saepe natus
          doloribus, quasi dolorem explicabo praesentium. Eligendi commodi amet,
          minus modi laudantium beatae ducimus.
        </p>
        <div className="h-[56vh] border border-primary/50 w-full p-2 rounded-md overflow-auto">
          <FileElement
            name={template.drive}
            template={template}
            setTemplate={setTemplate}
          />
        </div>
        <div className="w-full flex justify-end gap-4">
          <Button>Create</Button>
        </div>
      </div>
    </main>
  );
};

export default CreateTemplate;

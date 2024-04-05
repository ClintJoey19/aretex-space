import React from "react";
import { Button } from "@/components/ui/button";
import { RiAddLine } from "react-icons/ri";

export const FileElement = ({ name, template, setTemplate }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="max-w-40 bg-primary text-white py-1 px-4 rounded-sm">
        <p>{name}</p>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          console.log("Add");
        }}
      >
        <RiAddLine />
      </Button>
    </div>
  );
};

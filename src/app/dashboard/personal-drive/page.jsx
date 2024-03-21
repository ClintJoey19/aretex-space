"use client";
import React, { useState } from "react";
import DisplayType from "@/components/global/DisplayType";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/dashboard/shared-drive/DataTable";
import { DropdownMenuDemo } from "@/components/global/DropDown";

const PersonalDrive = () => {
  const [display, setDisplay] = useState(0);
  const [selected, setSelected] = useState([]);

  return (
    <main className="m-2 bg-white rounded-sm border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Personal Drive</h2>
        <div className="flex justify-end items-center gap-2">
          {selected.length > 0 ? (
            <div className="flex gap-2 items-center rounded-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelected([])}
              >
                <AiOutlineClose />
              </Button>
              <p>{selected.length} selected</p>
              <Button variant="outline" size="icon">
                <DropdownMenuDemo />
              </Button>
            </div>
          ) : null}
          <DisplayType display={display} setDisplay={setDisplay} />
        </div>
        <div>
          <DataTableDemo selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </main>
  );
};

export default PersonalDrive;

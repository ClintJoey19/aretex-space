"use client";
import React, { useState } from "react";
import DisplayType from "@/components/global/DisplayType";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/global/SearchInput";
import { DataTableDemo } from "@/components/dashboard/shared-drive/DataTable";
import { TableDemo } from "@/components/dashboard/Table";
import { DropdownMenuDemo } from "@/components/global/DropDown";

const SharedDrives = () => {
  const [display, setDisplay] = useState(0);
  const [selected, setSelected] = useState([1, 2]);
  return (
    <main className="m-2 bg-white rounded-sm border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Shared Drives</h2>
        <SearchInput />
        <div className="flex flex-col gap-2">
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
          {/* <DataTableDemo selected={selected} setSelected={setSelected} /> */}
          <TableDemo selected={selected} setSelected={setSelected} />
        </div>
      </div>
    </main>
  );
};

export default SharedDrives;

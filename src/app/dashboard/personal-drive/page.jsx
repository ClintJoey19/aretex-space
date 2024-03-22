"use client";
import React, { useState } from "react";
import DisplayType from "@/components/global/DisplayType";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/dashboard/shared-drive/DataTable";
import { DropdownMenuDemo } from "@/components/global/DropDown";

const files = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "hejajej@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "yeah11@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "roboto@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "arial@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "neoz@hotmail.com",
  },
];

const PersonalDrive = () => {
  const [display, setDisplay] = useState(0);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(files);

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
          <DataTableDemo
            selected={selected}
            setSelected={setSelected}
            data={data}
            setData={setData}
          />
        </div>
      </div>
    </main>
  );
};

export default PersonalDrive;

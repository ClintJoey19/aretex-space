"use client";
import React, { useState } from "react";
import DisplayType from "@/components/global/DisplayType";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/global/SearchInput";
import { DataTableDemo } from "@/components/dashboard/DataTable";
import { TableDemo } from "@/components/dashboard/Table";
import { DropDownTableActions } from "@/components/global/DropDownTableActions";

const SharedDrives = () => {
  return (
    <main className="m-2 bg-white rounded-sm border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Shared Drives</h2>
        <SearchInput />
        <div className="flex flex-col gap-2"></div>
      </div>
    </main>
  );
};

export default SharedDrives;

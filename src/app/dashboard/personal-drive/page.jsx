"use client";
import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DisplayType from "@/components/global/DisplayType";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "@/components/dashboard/DataTable";
import { DropdownMenuTableActions } from "@/components/global/DropDownTableActions";
import { columns } from "./columns";
import { rows } from "@/app/dashboard/personal-drive/rows";
import { actions } from "@/components/dashboard/shared-drive/DriveActions";

const PersonalDrive = () => {
  const [display, setDisplay] = useState(0);
  const [data, setData] = useState(rows);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Personal Drive</h2>
        <div className="flex justify-end items-center gap-2">
          {table.getFilteredSelectedRowModel().rows.length > 0 ? (
            <div className="flex gap-2 items-center rounded-sm">
              <Button variant="ghost" size="icon">
                <AiOutlineClose />
              </Button>
              <p>{table.getFilteredSelectedRowModel().rows.length} selected</p>
              <Button variant="outline" size="icon">
                <DropdownMenuTableActions actions={actions} />
              </Button>
            </div>
          ) : null}
          <DisplayType display={display} setDisplay={setDisplay} />
        </div>
        <div>
          <DataTableDemo table={table} />
        </div>
      </div>
    </main>
  );
};

export default PersonalDrive;

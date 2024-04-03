"use client";
import React, { useEffect, useState } from "react";
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
import { columns } from "@/app/dashboard/shared-drives/columns";
import { actions } from "@/components/dashboard/shared-drive/DriveActions";

const getDrives = async () => {
  const res = await fetch("http://localhost:3000/api/dashboard/shared-drive");

  if (!res.ok) {
    console.log("Something went wrong");
  }

  return res.json();
};

const SharedDrives = () => {
  const [display, setDisplay] = useState(0);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const fetched = async () => {
      const res = await getDrives();
      console.log(res);
      setData(res.result);
    };

    fetched();
  }, []);

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
        <h2 className="text-2xl">Shared Drives</h2>
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
          <DataTableDemo table={table} columns={columns} />
        </div>
      </div>
    </main>
  );
};

export default SharedDrives;

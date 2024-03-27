"use client";
import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableDemo } from "@/components/dashboard/DataTable";
import { User } from "@/lib/models";

const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/dashboard/users");

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};

const DashboardPage = () => {
  const [display, setDisplay] = useState(0);
  const [data, setData] = useState([]);
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

  useEffect(async () => {
    const users = await getUsers();
    setData((prev) => [...prev, users]);
  }, [data]);

  return (
    <main className="m-2">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Dashboard</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-[100px] bg-white rounded-md"></div>
          <div className="h-[100px] bg-white rounded-md"></div>
          <div className="h-[100px] bg-white rounded-md"></div>
        </div>
        <div>{/* <DataTableDemo table={table} columns={}/> */}</div>
      </div>
    </main>
  );
};

export default DashboardPage;

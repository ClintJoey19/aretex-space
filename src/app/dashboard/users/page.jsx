"use client";
import React, { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { UserDataTable } from "@/components/dashboard/UserDataTable";
import { columns } from "@/app/dashboard/users/columns";
import { Suspense } from "react";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/dashboard/users", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error fetching users");
    }

    return res;
  } catch (err) {
    return err.message;
  }
};

const Users = () => {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    const fetched = async () => {
      const res = await getData();
      const data = await res.json();
      setData(data);
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
        <h2 className="text-2xl">Users</h2>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <UserDataTable table={table} columns={columns} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Users;

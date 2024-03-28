"use client";
import { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { DataTableDemo } from "@/components/dashboard/DataTable";
// import { columns } from "@/app/dashboard/columns";

const DashboardPage = () => {
  // const [display, setDisplay] = useState(0);
  // const [data, setData] = useState([]);
  // const [sorting, setSorting] = useState([]);
  // const [columnFilters, setColumnFilters] = useState([]);
  // const [columnVisibility, setColumnVisibility] = useState({});
  // const [rowSelection, setRowSelection] = useState({});

  // const table = useReactTable({
  //   data,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // });

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

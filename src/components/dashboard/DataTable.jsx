"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { flexRender } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DisplayType from "@/components/global/DisplayType";
import { Button } from "@/components/ui/button";
import { DropdownMenuTableActions } from "@/components/global/DropDownTableActions";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInView } from "react-intersection-observer";
import { columns } from "@/app/dashboard/shared-drives/columns";
import {
  actions,
  multiActions,
} from "@/components/dashboard/shared-drive/DriveActions";
import Spinner from "../global/Spinner";

const getDrives = async (nextPageToken = null) => {
  // let URL = "https://aretex-space.vercel.app/api/dashboard/shared-drive"; // vercel
  // let URL =
  //   "https://cheerful-cat-3fcb8b.netlify.app/api/dashboard/shared-drive"; // netlify
  let URL = "http://localhost:3000/api/dashboard/shared-drive";

  if (nextPageToken) {
    URL += `?nextPageToken=${nextPageToken}`;
  }

  const res = await fetch(URL, { cache: "no-store" });

  if (!res.ok) {
    console.log("Something went wrong");
  }

  return res.json();
};

export function DataTableDemo() {
  const [display, setDisplay] = useState(0);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const loadMoreDrives = async () => {
    if (token) {
      setIsFetching(true);
      const res = await getDrives(token);
      const drives = res.result.sharedDrives;
      setData((prev) => [...prev, ...drives]);
      setToken(res.result.newToken);
      setPagination({
        ...pagination,
        pageSize: pagination.pageSize + drives.length,
      });
      setIsFetching(false);
    } else {
      const res = await getDrives();
      setData(res.result.sharedDrives);
      setToken(res.result.newToken);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreDrives();
    }
  }, [inView]);

  return (
    <div className="w-full">
      <div className="flex justify-end items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <div className="flex gap-2 items-center rounded-sm">
            <p>{table.getFilteredSelectedRowModel().rows.length} selected</p>
            <Button variant="outline" size="icon">
              <DropdownMenuTableActions
                type="multiple"
                actions={
                  table.getFilteredSelectedRowModel().rows.length > 2
                    ? multiActions
                    : actions
                }
                table={table}
              />
            </Button>
          </div>
        ) : null}
        <DisplayType display={display} setDisplay={setDisplay} />
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value);
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border h-[58vh] overflow-y-auto relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onDoubleClick={() =>
                    router.push(`/dashboard/shared-drives/${row.original.id}`)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={isFetching && "hidden"}>
                <TableCell colSpan={10} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
            <TableRow ref={ref} className={token === undefined && "hidden"}>
              <TableCell colSpan={10} className="h-24 text-center">
                {token !== undefined && <Spinner />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

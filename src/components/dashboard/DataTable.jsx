"use client";
import { useEffect, useRef, useState } from "react";
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
import { AiOutlineClose } from "react-icons/ai";
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
import { useIntersection } from "@mantine/hooks";
import { columns } from "@/app/dashboard/shared-drives/columns";
import { actions } from "@/components/dashboard/shared-drive/DriveActions";

const getDrives = async (nextPageToken = null) => {
  let URL = "http://localhost:3000/api/dashboard/shared-drive";

  if (nextPageToken) {
    URL += `?nextPageToken=${nextPageToken}`;
  }

  const res = await fetch(URL, {
    cache: "no-store",
  });

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
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetched = async () => {
      setIsFetching(true);
      const res = await getDrives();
      setData(res.result.sharedDrives);
      setToken(res.result.newToken);
      setIsFetching(false);
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

  const lastItemRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastItemRef.current,
    threshold: 1,
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
    }
  };

  useEffect(() => {
    if (entry?.isIntersecting) loadMoreDrives(token);
  }, [entry]);

  return (
    <div className="w-full">
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
            console.log(table.getColumn("name"));
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
            {table.getRowModel().rows?.length || isFetching ? (
              table.getRowModel().rows.map((row, i) =>
                i === data.length ? (
                  <TableRow
                    ref={ref}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
                ) : (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-2 justify-center">
        <Button onClick={loadMoreDrives}>Load more</Button>
        <p>{table.getFilteredRowModel().rows.length}</p>
        <p>page size {pagination.pageSize}</p>
        <p>{isFetching ? "fetching..." : "fetched"}</p>
        <p>{entry?.isIntersecting ? "Seen" : "Not"}</p>
        {/* <p>{token.substring(0, 40) + "..."}</p> */}
      </div>
    </div>
  );
}

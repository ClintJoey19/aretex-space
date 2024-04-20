"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DisplayType from "@/components/global/DisplayType";
import MultiFolderDropDown from "../global/MultiFolderDropDown";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "@/app/dashboard/shared-drives/[id]/columns";
import Spinner from "../global/Spinner";
import { DOMAIN } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const getDrive = async (driveId, token = null) => {
  let URL = `${DOMAIN}/api/dashboard/shared-drive/${driveId}`;

  if (token) {
    URL += `?nextPageToken=${token}`;
  }

  const res = await fetch(URL);
  const data = await res.json();

  return data;
};

const ContentTable = ({ driveId }) => {
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
  const { ref, inView } = useInView();

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

  const loadMore = async () => {
    if (token) {
      setIsFetching(true);
      const { nextPageToken, files } = await getDrive(driveId, token);
      setData((prev) => [...prev, ...files]);
      setToken(nextPageToken);
      setPagination({
        ...pagination,
        pageSize: pagination.pageSize + files.length,
      });
      setIsFetching(false);
    } else {
      const { nextPageToken, files } = await getDrive(driveId);
      setData(files);
      setToken(nextPageToken);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, [inView]);

  return (
    <div className="w-full">
      <div className="flex justify-end items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <div className="flex gap-2 items-center rounded-sm">
            <p>{table.getFilteredSelectedRowModel().rows.length} selected</p>
            <MultiFolderDropDown table={table} />
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
      </div>
      <div className="rounded-md border h-[60vh] overflow-y-auto relative">
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
              table.getRowModel().rows.map((row) => (
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
};

export default ContentTable;

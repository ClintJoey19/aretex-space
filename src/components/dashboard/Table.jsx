import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { DropdownMenuTableActions } from "../global/DropDownTableActions";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

const drives = [
  {
    id: 1,
    name: "ABC",
    date: "Date",
    members: 4,
  },
  {
    id: 2,
    name: "DEF",
    date: "Date",
    members: 7,
  },
  {
    id: 3,
    name: "GHI",
    date: "Date",
    members: 1,
  },
  {
    id: 4,
    name: "JKL",
    date: "Date",
    members: 5,
  },
  {
    id: 5,
    name: "MNO",
    date: "Date",
    members: 10,
  },
];

export function TableDemo({ selected, setSelected }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Members</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drives.map((drive) => (
          <TableRow key={drive.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{drive.id}</TableCell>
            <TableCell>{drive.name}</TableCell>
            <TableCell>
              {drive.members} {drive.members < 2 ? "member" : "members"}
            </TableCell>
            <TableCell className="text-center">
              <Button variant="outline" size="icon">
                <DropdownMenuTableActions />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

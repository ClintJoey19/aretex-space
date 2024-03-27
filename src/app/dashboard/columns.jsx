// TODO: add columns for user's table
export const columns = [
  {
    accessorKey: "id",
    header: () => <div>Id</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "profile",
    header: () => <div>Profile</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "id",
    header: () => <div>Id</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
];

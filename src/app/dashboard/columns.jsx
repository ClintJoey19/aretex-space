// TODO: add columns for user's table
export const columns = [
  {
    accessorKey: "id",
    header: () => <div>Id</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "img",
    header: () => <div>Profile</div>,
    cell: ({ row }) => <div>{row.getValue("img")}</div>,
  },
  {
    accessorKey: "username",
    header: () => <div>Username</div>,
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
];

import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

export const actions = [
  {
    text: "Copy Link",
    icon: IoLinkOutline,
    fn: ({ path, id }) => {
      const URL = `http://localhost:3000/dashboard/${path}/${id}`;
      navigator.clipboard.writeText(URL);
    },
  },
];

export const multiActions = [
  // {
  //   id: 1,
  //   trigger: (
  //     <DropdownMenuItem>
  //       <MdOutlineGroup className="mr-4" />
  //       Manage Members
  //     </DropdownMenuItem>
  //   ),
  //   fn: ({ id }) => console.log(id),
  // },
];

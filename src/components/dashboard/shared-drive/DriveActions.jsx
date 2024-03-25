import { AiOutlineFolderOpen } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

export const actions = [
  {
    text: "Organize",
    icon: AiOutlineFolderOpen,
    fn: ({ id }) => console.log(id),
  },
  {
    text: "Make a Copy",
    icon: IoCopyOutline,
    fn: ({ id }) => navigator.clipboard.writeText(id),
  },
  {
    text: "Manage Members",
    icon: MdOutlineGroup,
    fn: ({ id }) => console.log(id),
  },
  {
    text: "Copy Link",
    icon: IoLinkOutline,
    fn: ({ path, id }) => {
      const URL = `http://localhost:3000/dashboard/${path}/${id}`;
      navigator.clipboard.writeText(URL);
    },
  },
  {
    text: "Rename",
    icon: MdOutlineEdit,
    fn: ({ id }) => console.log(id),
  },
  {
    text: "Star",
    icon: MdOutlineStarOutline,
    fn: ({ id }) => console.log(id),
  },
  {
    text: "Move to Trash",
    icon: FaRegTrashCan,
    fn: ({ id }) => console.log(id),
  },
];

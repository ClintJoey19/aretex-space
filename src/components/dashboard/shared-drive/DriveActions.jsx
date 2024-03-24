import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineGroup } from "react-icons/md";
import { IoLinkOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

export const actions = [
  {
    text: "Organize",
    icon: AiOutlineFolderOpen,
  },
  {
    text: "Manage Members",
    icon: MdOutlineGroup,
  },
  {
    text: "Copy Link",
    icon: IoLinkOutline,
  },
  {
    text: "Rename",
    icon: MdOutlineEdit,
  },
  {
    text: "Star",
    icon: MdOutlineStarOutline,
  },
  {
    text: "Move to Trash",
    icon: FaRegTrashCan,
  },
];

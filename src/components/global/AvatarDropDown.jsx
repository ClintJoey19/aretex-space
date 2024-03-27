"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

const AvatarDropDown = () => {
  const session = useSession();

  if (session.status === "authenticated")
    return (
      <Popover className="cursor-pointer p-4">
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src={session.data.user?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80 flex flex-col gap-4 p-4" align="end">
          <div className="">
            <h2 className="font-bold text-lg">
              <span className="text-primary">Hi</span> there,
            </h2>
            <p className="text-sm font-semibold">{session.data.user.name}</p>
            <p className="text-sm">{session.data.user.email}</p>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => signOut()}>
              <IoLogOutOutline className="mr-4" /> Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
};

export default AvatarDropDown;

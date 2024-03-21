import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const isAuth = true;
  return (
    <section className="h-[8vh] w-full flex justify-center items-center border bg-white">
      <div className="w-[95%] h-full px-2 flex items-center justify-between">
        <div className="cursor-pointer">
          <Link href="/dashboard">
            <h2 className="font-bold">Space</h2>
          </Link>
        </div>
        <div>
          {isAuth ? (
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;

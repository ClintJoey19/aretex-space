"use client";
import React from "react";
import Link from "next/link";
import AvatarDropDown from "../global/AvatarDropDown";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  return (
    <section className="h-[8vh] w-full flex justify-center items-center border bg-white">
      <div className="w-[95%] h-full px-2 flex items-center justify-between">
        <div className="cursor-pointer">
          <Link href="/dashboard">
            <h2 className="font-bold">Space</h2>
          </Link>
        </div>
        <div className="h-full flex items-center cursor-pointer">
          {session.status === "authenticated" ? (
            <AvatarDropDown session={session} />
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

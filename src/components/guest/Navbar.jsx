"use client";
import React, { useState } from "react";
import Link from "next/link";
import Container from "../global/Container";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Dashboard",
    href: "/dashboard",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Contact",
    href: "/contact",
  },
];

const Navbar = ({ isAuth, setIsAuth }) => {
  const path = usePathname();

  return (
    <section className="w-full h-[10vh] flex justify-center items-center">
      <Container className="min-w-[1220px] h-full flex justify-between items-center">
        <div className="cursor-pointer">
          <Link href="/">
            <h2 className="font-bold">Space</h2>
          </Link>
        </div>
        <div className="">
          <nav>
            <ul className="flex gap-10">
              {navLinks.map((item, i) => (
                <li
                  key={i}
                  className={`${
                    path === item.href ? "text-primary font-semibold" : ""
                  } hover:text-primary`}
                >
                  <Link href={item.href}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex gap-5">
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
      </Container>
    </section>
  );
};

export default Navbar;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import Container from "../global/Container";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import AvatarDropDown from "../global/AvatarDropDown";
import { useSession } from "next-auth/react";
import SignInButton from "../global/SignInButton";

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
  const session = useSession();

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
                  } ${
                    i === 1 && session.status !== "authenticated"
                      ? "hidden"
                      : ""
                  } hover:text-primary`}
                >
                  <Link href={item.href}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex gap-5 cursor-pointer">
          {session.status === "authenticated" ? (
            <AvatarDropDown isAuth={isAuth} setIsAuth={setIsAuth} />
          ) : (
            <SignInButton />
          )}
        </div>
      </Container>
    </section>
  );
};

export default Navbar;

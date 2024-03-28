"use client";
import { useState } from "react";
import Navbar from "@/components/guest/Navbar";
import Hero from "@/components/guest/home/Hero";
import { useSession } from "next-auth/react";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const session = useSession();
  console.log(session);

  return (
    <main>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Hero />
    </main>
  );
}

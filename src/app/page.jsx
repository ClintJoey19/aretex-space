"use client";
import { useState } from "react";
import Navbar from "@/components/guest/Navbar";
import Hero from "@/components/guest/home/Hero";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <main>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Hero />
    </main>
  );
}

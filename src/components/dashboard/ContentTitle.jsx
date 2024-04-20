"use client";
import { useState, useEffect } from "react";
import { DOMAIN } from "@/lib/utils";

const ContentTitle = ({ id }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    let URL = `${DOMAIN}/api/dashboard/files`;
    const fetched = async () => {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      setName(data.name);
    };
    fetched();
  });
  return (
    <>
      <h2 className="text-2xl">{name}</h2>
    </>
  );
};

export default ContentTitle;

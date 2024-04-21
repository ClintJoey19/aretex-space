"use client";
import { useState, useEffect } from "react";
import CreateFolder from "../global/CreateFolder";
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
    <div className="w-full flex gap-3 items-center">
      <h2 className="text-2xl">
        {name.length > 20 ? `${name.slice(0, 20)}...` : name}
      </h2>
      <CreateFolder />
    </div>
  );
};

export default ContentTitle;

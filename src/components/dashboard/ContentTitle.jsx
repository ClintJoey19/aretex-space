"use client";
import { useState, useEffect } from "react";

const ContentTitle = ({ id }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    let URL = "http://localhost:3000/api/dashboard/files";
    const fetched = async () => {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      console.log(data);
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

"use client";
import React, { useEffect, useState } from "react";
import ContentTable from "@/components/dashboard/ContentTable";

const ContentPage = ({ params }) => {
  const [name, setName] = useState();

  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4" suppressHydrationWarning={true}>
        <h2 className="text-2xl">{params.id}</h2>
        <ContentTable id={params.id} />
      </div>
    </main>
  );
};

export default ContentPage;

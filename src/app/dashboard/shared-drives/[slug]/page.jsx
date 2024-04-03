import { useParams } from "next/navigation";
import React from "react";

const ContentPage = () => {
  const params = useParams();
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Drive: {params}</h2>
      </div>
    </main>
  );
};

export default ContentPage;

import React from "react";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <main className="bg-primary/15">
      <Navbar />
      <div className="h-[92vh] grid grid-cols-[300px_1fr]">
        <Sidebar />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;

import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <main className="bg-primary/10">
        <Navbar />
        <div className="h-[92vh] grid grid-cols-[300px_1fr] max-md:grid-cols-[50px_1fr]">
          <Sidebar />
          {children}
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default DashboardLayout;

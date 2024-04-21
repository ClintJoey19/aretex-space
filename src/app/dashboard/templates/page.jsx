import SingleDriveTemplates from "@/components/dashboard/templates/SingleDriveTemplates";
import CreateTemplate from "@/components/global/CreateTemplate";

const Templates = () => {
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="h-full p-4 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl">Templates</h2>
          <CreateTemplate />
        </div>
        <div className="h-full grid gap-4">
          <SingleDriveTemplates />
        </div>
      </div>
    </main>
  );
};

export default Templates;

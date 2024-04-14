import SingleDriveTemplates from "@/components/dashboard/templates/SingleDriveTemplates";
import MultipleDriveTemplates from "@/components/dashboard/templates/MultipleDriveTemplates";

const Templates = () => {
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="h-full p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Templates</h2>
        <div className="h-full grid grid-cols-2 gap-4">
          <SingleDriveTemplates />
          <MultipleDriveTemplates />
        </div>
      </div>
    </main>
  );
};

export default Templates;

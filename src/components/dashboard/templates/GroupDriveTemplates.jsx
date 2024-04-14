import Image from "next/image";

const GroupDriveTemplates = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Group Drive Templates</h3>
      <div className="h-full flex flex-col items-center gap-2">
        <div className="h-full w-full relative">
          <Image src="/coming-soon.svg" alt="coming-soon" fill />
        </div>
        <p className="py-2 px-4 hover:bg-primary/20 transition-all rounded-md text-primary font-bold cursor-pointer">
          Coming Soon
        </p>
      </div>
    </div>
  );
};

export default GroupDriveTemplates;

import { getDriveTemplates } from "@/lib/data";
import Template from "./Template";

const SingleDriveTemplates = async () => {
  const data = await getDriveTemplates();

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <h3 className="text-lg">Single Drive Templates</h3>
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <Template key={i} template={item} />
        ))}
      </div>
    </div>
  );
};

export default SingleDriveTemplates;

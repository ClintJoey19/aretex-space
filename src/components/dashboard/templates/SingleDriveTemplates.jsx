import { getDriveTemplates } from "@/lib/data";
import Template from "./Template";

const SingleDriveTemplates = async () => {
  const data = await getDriveTemplates();

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <Template key={i} template={item} />
        ))}
      </div>
    </div>
  );
};

export default SingleDriveTemplates;

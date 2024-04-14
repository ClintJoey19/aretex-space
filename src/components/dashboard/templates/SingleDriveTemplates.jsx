import { getDriveTemplates } from "@/lib/data";

const SingleDriveTemplates = async () => {
  const data = await getDriveTemplates();
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg">Single Drive Templates</h3>
      <div>
        {data.map((item, i) => (
          <div key={i}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleDriveTemplates;

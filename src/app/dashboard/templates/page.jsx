import { getDriveTemplates } from "@/lib/data";

const Templates = async () => {
  const res = await getDriveTemplates();
  const data = await res.json();
  return (
    <main className="m-2 bg-white rounded-md border">
      <div className="p-4 flex flex-col gap-4">
        <h2 className="text-2xl">Templates</h2>
        {data.map((item, i) => (
          <div key={i}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Templates;

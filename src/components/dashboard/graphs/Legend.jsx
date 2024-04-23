import { formatBytes } from "@/lib/utils";

const Legend = ({ color, name, data }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-sm bg-[${color}]`}></div>
      <p className={`text-md font-semibold text-[${color}]`}>
        {formatBytes(data)}
      </p>
    </div>
  );
};

export default Legend;

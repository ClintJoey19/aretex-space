import { formatBytes } from "@/lib/utils";

const colors = ["#36a2eb", "#ff6384", "#fdce4a", "#7956ff"];

const Legend = ({ color, name, data }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-sm bg-[${color}]`}></div>
      <div className="w-full flex justify-between">
        <p className="text-md">{name}</p>
        <p className={`text-md font-semibold text-[${color}]`}>
          {formatBytes(data)}
        </p>
      </div>
    </div>
  );
};

export default Legend;

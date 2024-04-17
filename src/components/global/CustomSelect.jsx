"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

const CustomSelect = ({ title, items, data, setData }) => {
  return (
    <Select
      value={data}
      onValueChange={(value) => {
        setData(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select a ${title}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {items.map((item, i) => (
            <SelectItem key={item._id ?? i} value={item._id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;

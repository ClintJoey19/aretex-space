import React from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <div className="relative w-[200px]">
      <CiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600" />
      <Input type="text" placeholder="Search" className="pl-8 " />
    </div>
  );
};

export default SearchInput;

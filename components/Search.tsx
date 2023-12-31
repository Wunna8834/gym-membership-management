'use client'
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}
const Search = ({onSearchChange}: SearchProps) => {
  return (
    <div className="w-full">
      <Input
        className="w-48 bg-[#2d2d2d] border-slate-300 border"
        type="text"
        placeholder="👀 Search Member..."
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Search;

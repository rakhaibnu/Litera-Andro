import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4 font-lato ">
      <div className="w-full flex items-center relative"> 
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className="px-6 py-3 pr-12 border  rounded-full w-full " 
          placeholder="Search books by title, author, or genre..." 
        />
        <MagnifyingGlassIcon 
          className="h-6 w-6 text-latte-cream-10  cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
          aria-hidden="true" 
          onClick={() => handleSearch(query)}
        />
      </div>
    </form>
  );
}
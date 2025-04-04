import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4 font-lato">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className="p-2 border rounded-md w-full" 
        placeholder="Search books by title, author, or genre..." 
      />
      <button type="submit" className="bg-dark text-primary px-5 py-2 rounded-full hover:bg-light hover:text-black transition duration-300">Search</button>
    </form>
  );
}
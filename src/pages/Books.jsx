import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Data contoh - ganti dengan data dinamis
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://via.placeholder.com/150",
      rating: 4.5
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      cover: "https://via.placeholder.com/150",
      rating: 4.2
    },
    // Tambahkan buku lain
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Collection</h1>
      
      <SearchBar 
        onSearch={setSearchQuery} 
        placeholder="Search by title or author..."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No books found</p>
      )}
    </div>
  );
}
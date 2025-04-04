import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", cover: "https://via.placeholder.com/150" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", cover: "https://via.placeholder.com/150" },
  ];

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <h1 className="text-3xl font-bold mb-4">Popular Books</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

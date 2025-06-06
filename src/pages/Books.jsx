import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Books() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);


  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/popular`);
        if (response.data && response.data.books) {
          const transformed = response.data.books.map((book) => ({
            id: book.id || Math.random().toString(),
            title: book.title || "Unknown Title",
            author: book.authors?.join(', ') || "Unknown Author",
            cover: book.thumbnail || 'https://via.placeholder.com/150',
            rating: book.rating || 0,
            genres: book.genre || [],
          }));
          setPopularBooks(transformed);
        }
      } catch (err) {
        console.error("Failed to fetch popular books:", err);
      }
    };

    fetchPopularBooks();
  }, []);

  // Fetch hasil search
  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) {
        setBooks([]);
        return;
      }

      try {
        const params = new URLSearchParams({ q: searchQuery });
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/search?${params.toString()}`);

        if (response.data && response.data.books) {
          const transformed = response.data.books.map(book => ({
            id: book.id || Math.random().toString(),
            title: book.title || "Unknown Title",
            author: book.authors?.join(', ') || "Unknown Author",
            cover: book.thumbnail || 'https://via.placeholder.com/150',
            rating: book.rating || 0,
            genres: book.genre || [],
          }));

          setBooks(transformed);
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  const displayBooks = searchQuery ? books : popularBooks;

  return (
    <div className="min-h-screen p-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search by title or author..."
        />

        <h2 className="text-xl font-semibold mt-6 mb-4">
          {searchQuery ? `Search results for "${searchQuery}"` : "Popular Books"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBooks.length > 0 ? (
            displayBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-8">
              No books found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

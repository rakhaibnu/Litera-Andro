import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import axios from 'axios';

export default function Books() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) return;

      try {
        const params = new URLSearchParams({ q: searchQuery });
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/search?${params.toString()}`
        );

        if (response.data && response.data.books) {
          const transformed = response.data.books.map((book) => ({
            id: book.id || Math.random().toString(),
            title: book.title || 'Unknown Title',
            author: book.authors?.join(', ') || 'Unknown Author',
            cover: book.thumbnail || 'https://via.placeholder.com/150',
            rating: book.rating || 0,
            categories: book.categories || [],
            bookType: book.fiction ? 'fiction' : 'nonFiction',
            genres: book.genre || [],
          }));

          setBooks(transformed);
        }
      } catch (err) {
        console.error('Failed to fetch books:', err);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen p-4 pt-24 md:pt-28">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Search Bar */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search by title or author..."
            />
          </div>
        </div>

        <main className="w-full">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}

            {filteredBooks.length === 0 && (
              <p className="col-span-full text-center text-gray-500 mt-8">
                No books found. Try adjusting your search query.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

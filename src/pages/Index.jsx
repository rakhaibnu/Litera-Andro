import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import Hero from '../assets/hero1.svg';
import LiteraLogo from '../assets/Logo.png';
import { Link } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/popular`);
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
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error('Failed to fetch popular books:', err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  return (
    <main className="grow w-full">
      <div className="flex items-center bg-sage-green-1 pt-32 justify-between px-15 shadow-lg py-5">
        <div className="flex-col font-merriweather">
          <h1 className="text-5xl">Find Your Next Great Read With Trusted Reviews!</h1>
          <p>Dive into in-depth book reviews across various genres</p>
        </div>
        <img src={Hero} alt="Hero Illustration" className="h-50" />
      </div>

      <div className="flex items-center justify-between px-15">
        <h1 className="text-3xl font-bold my-4">Popular Books</h1>
        <div className="flex gap-2">
          <CircleChevronLeft size={36} color="#4B5343" />
          <CircleChevronRight size={36} color="#4B5343" />
        </div>
      </div>

      {loading ? (
        <p className="px-15">Loading popular books...</p>
      ) : books.length === 0 ? (
        <p className="px-15">No popular books found.</p>
      ) : (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-15">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <footer className="bg-secondary text-dark py-10 px-10 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 font-lato">
          <div>
            <p className="font-bold mb-4 text-deep-mocha-brown-8 text-lg">ABOUT</p>
            <ul className="space-y-2">
              <li><Link to="/about-project" className="hover:text-dark">About the Project</Link></li>
              <li><Link to="/purpose" className="hover:text-dark">Purpose & Benefits</Link></li>
              <li><Link to="/data-source" className="hover:text-dark">Data Source</Link></li>
              <li><Link to="/team" className="hover:text-dark">Development Team</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-4 text-deep-mocha-brown-8 text-lg">RESOURCES</p>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-dark">About the Project</Link></li>
              <li><Link to="/how-to-review" className="hover:text-dark">How to Review</Link></li>
              <li><Link to="/categories" className="hover:text-dark">Book Categories List</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-4 text-deep-mocha-brown-8 text-lg">COMMUNITY</p>
            <ul className="space-y-2">
              <li><Link to="/forum" className="hover:text-dark">Reader Forum</Link></li>
              <li><Link to="/suggestion" className="hover:text-dark">Send Suggestion</Link></li>
              <li><Link to="/join" className="hover:text-dark">Join Us</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold mb-4 text-deep-mocha-brown-8 text-lg">SUPPORT</p>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-dark">FAQ</Link></li>
              <li><Link to="/search-guide" className="hover:text-dark">Search Guide</Link></li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <img src={LiteraLogo || '/placeholder.svg'} alt="Litera Logo" className="h-16 mb-4" />
            <p className="text-sm text-center">&copy; {new Date().getFullYear()} Litera. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

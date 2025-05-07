import { useState, useEffect } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [isLoggedIn] = useState(false); // Simulasi status login
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: 'The Hunger Games',
      author: 'Suzanne Collins',
      description:
        "In a dystopian future, Katniss Everdeen volunteers to take her sister's place in a deadly tournament.",
      cover:
        'https://m.media-amazon.com/images/I/41eShW9i3yL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
      reviews: [
        {
          text: "This book is amazing! The concept is unique, action-packed, and Katniss' character is very strong. The plot is addictive, it's hard to stop reading. A must read for dystopian lovers!",
          user: 'Suzanne Collins',
          rating: 5,
          date: '2025-03-30',
        },
      ],
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Learn how tiny changes can yield remarkable results.',
      cover: 'https://via.placeholder.com/150',
      reviews: [
        {
          text: 'This book changed my life!',
          user: 'John Doe',
          rating: 5,
          date: '2023-05-15',
        },
      ],
    },
  ];

  const allReviews = books.flatMap((book) =>
    book.reviews.map((review) => ({
      ...review,
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookCover: book.cover,
      bookDescription: book.description,
    }))
  );

  const filteredReviews = allReviews.filter(
    (review) =>
      review.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return sortOption === 'newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  useEffect(() => {
    if (sortedReviews.length === 0 && searchQuery !== '') {
      const timeout = setTimeout(() => {
        navigate('/noreview');
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [sortedReviews, searchQuery, navigate]);

  const handleSeeReview = (bookId) => {
    if (!isLoggedIn) {
      navigate('/nologin'); // Arahkan ke halaman NoLogin jika belum login
    } else {
      navigate(`/book/${bookId}`); // Arahkan ke halaman BookDetails jika sudah login
    }
  };

  return (
    <div className="container mx-auto py-24 max-w-6xl space-y-12min w-full ">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">Reviewed Book</h1>

        <div className="w-full sm:w-2/3 pt-4 ">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search books by title, author, or genre…"
            className="w-full sm:w-2/3 border rounded-full px-4 shadow"
          />
        </div>

        <div className="w-full sm:w-2/3 flex justify-start relative pb-4">
          <div className="relative w-40">
            <select
              className="appearance-none w-full pl-3 pr-8 py-2 border border-latte-cream-10 rounded-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-latte-cream-10 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="space-y-8 w-full sm:w-2/3 mx-auto">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review, index) => (
            <div
              key={`${review.bookId}-${review.user}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  <div className="w-full md:w-1/5 flex justify-center">
                    <img
                      src={review.bookCover}
                      alt={review.bookTitle}
                      className="h-full max-h-64 w-auto object-contain rounded-lg shadow self-end"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start flex-wrap">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {review.bookTitle}
                        </h2>
                        <p className="text-gray-600">by {review.bookAuthor}</p>
                      </div>
                      <div className="w-full md:w-1.5 flex items-center space-x-1 h-full">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-700 italic">"{review.text}"</p>
                    </div>

                    <div className="mt-6 flex flex-col items-start sm:items-end sm:flex-row justify-between gap-2 pt-4">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleSeeReview(review.bookId)}
                        text="See Review"
                        className="bg-warm-sand-6 hover:bg-sage-green-8 text-white text-sm text-center px-4 py-2 rounded-full transition duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No reviews found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import axios from 'axios';

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch all reviews by making multiple requests to existing endpoints
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        // Since there's no /reviews/all, we'll use another approach
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        // First, let's fetch some popular books or books we know have reviews
        const bookIdsWithReviews = [];
        
        // Get book IDs from localStorage - these are likely books the user has already viewed
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        bookIdsWithReviews.push(...favorites.map(book => book.id));
        
        // Add some hardcoded IDs that we know from your screenshots
        if (bookIdsWithReviews.indexOf('oNY0DwAAQBAJ') === -1) {
          bookIdsWithReviews.push('oNY0DwAAQBAJ');
        }
        
        let allReviews = [];
        
        // For each book ID, fetch its reviews
        for (const bookId of bookIdsWithReviews) {
          try {
            const response = await axios.get(`${apiUrl}/reviews/${bookId}`);
            if (response.data.success && response.data.data) {
              // Also fetch book details to match our UI requirements
              const bookResponse = await axios.get(`${apiUrl}/books/${bookId}`);
              const bookDetails = bookResponse.data.book || {};
              
              // Map the reviews with book details
              const reviewsWithBookDetails = response.data.data.map(review => ({
                id: review.id || `${bookId}-${review.user}-${Date.now()}`,
                text: review.comment || '',
                user: review.user || review.username || 'Anonymous',
                userId: review.userId,
                rating: 5, // Default rating since it's not in your schema
                date: review.createdAt,
                bookId: bookId,
                bookTitle: bookDetails.title || 'Unknown Title',
                bookAuthor: bookDetails.authors || 'Unknown Author',
                bookCover: bookDetails.thumbnail || 'https://via.placeholder.com/150',
                bookDescription: bookDetails.description || 'No description available'
              }));
              
              allReviews = [...allReviews, ...reviewsWithBookDetails];
            }
          } catch (err) {
            console.error(`Error fetching reviews for book ${bookId}:`, err);
            // Continue with other books even if one fails
          }
        }
        
        setReviews(allReviews);
        
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, []);

  const filteredReviews = reviews.filter(
    (review) =>
      review.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.bookAuthor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      navigate('/nologin'); // Redirect to NoLogin page if not logged in
    } else {
      navigate(`/book/${bookId}`); // Redirect to BookDetails page if logged in
    }
  };

  // If loading takes too long, provide a way to show mock data based on your screenshot
  const handleShowMockData = () => {
    const mockReviews = [
      {
        id: '1',
        text: 'Testing mau coba review',
        user: 'Rigi Yoga',
        userId: '1234',
        rating: 5,
        date: '2025-06-07T02:04:00',
        bookId: 'oNY0DwAAQBAJ',
        bookTitle: 'Design Patterns',
        bookAuthor: 'Erich Gamma et al.',
        bookCover: 'https://books.google.com/books/content?id=oNY0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs-api',
        bookDescription: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.'
      },
      {
        id: '2',
        text: 'hai hai',
        user: 'Rahel Veralda',
        userId: '5678',
        rating: 5,
        date: '2025-06-07T01:47:00',
        bookId: 'oNY0DwAAQBAJ',
        bookTitle: 'Design Patterns', 
        bookAuthor: 'Erich Gamma et al.',
        bookCover: 'https://books.google.com/books/content?id=oNY0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs-api',
        bookDescription: 'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.'
      }
    ];
    setReviews(mockReviews);
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-24 max-w-6xl space-y-12 w-full min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center">Reviewed Books</h1>

        <div className="w-full sm:w-2/3 pt-4">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search books by title, author, or review content..."
            className="w-full sm:w-2/3 border rounded-full px-4 shadow"
          />
        </div>

        <div className="w-full sm:w-2/3 flex justify-between items-center pb-4">
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
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-warm-sand-6 hover:bg-sage-green-8 text-white text-sm text-center px-4 py-2 rounded-full transition duration-300"
            >
              Refresh
            </button>
            {loading && (
              <button
                onClick={handleShowMockData}
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm text-center px-4 py-2 rounded-full transition duration-300"
              >
                Show Sample Data
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="w-full sm:w-2/3 mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-8 w-full sm:w-2/3 mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading reviews...</p>
            <div className="mt-4 space-y-4">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-lg bg-gray-300 h-32 w-24"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-lg bg-gray-300 h-32 w-24"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        ) : sortedReviews.length > 0 ? (
          sortedReviews.map((review, index) => (
            <div
              key={review.id || `${review.bookId}-${review.user}-${index}`}
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
                      <div className="w-full md:w-auto flex items-center space-x-1 h-full">
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
                        text="See Book Details"
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
              {searchQuery ? 'No reviews found matching your search' : 'No reviews yet. Be the first to review a book!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${id}`
        );
        console.log('API Response:', response.data);

        const rawBook = response.data.book || response.data;

        if (rawBook && rawBook.id) {
          setBook({
            id: rawBook.id,
            title: rawBook.title || 'Unknown Title',
            author: rawBook.authors?.join(', ') || 'Unknown',
            description: rawBook.description || 'No description available.',
            cover:
              rawBook.thumbnail ||
              'https://via.placeholder.com/300x450?text=No+Cover',
            genres: rawBook.genre || [],
            releaseDate: rawBook.releaseDate || '-',
            pages: rawBook.pages || '-',
            isbn: rawBook.isbn || '-',
            language: rawBook.language || '-',
            reviews: rawBook.reviews || [],
          });
        } else {
          setError('Book not found.');
        }
      } catch (err) {
        console.error('Failed to fetch book details:', err);
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    const checkFavorite = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isFav = favorites.some((favBook) => favBook.id === id);
      setIsFavourite(isFav);
    };

    checkFavorite();
  }, [id]);

  const handleToggleFavourite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavourite) {
      const updatedFavorites = favorites.filter((favBook) => favBook.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const bookToAdd = {
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover,
      };
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, bookToAdd])
      );
    }

    setIsFavourite(!isFavourite);
  };

  const handleAddReview = () => {
    navigate('/Signin');
  };

  if (loading) {
    return (
      <main className="container mx-auto py-20 max-w-4xl text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2 mx-auto"></div>
        </div>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="container mx-auto py-20 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={
                book.cover ||
                'https://via.placeholder.com/300x450?text=Not+Found'
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://via.placeholder.com/300x450?text=Not+Found';
              }}
              alt="Book cover"
              className="w-full max-w-xs max-h-[400px] md:max-h-[450px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold">Book not found</h1>
            <p className="text-gray-700 text-lg mt-1 mb-2">by Unknown</p>
            <p className="text-gray-800 mb-4">
              {error || 'Book data is unavailable.'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-20 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={
              book.cover || 'https://via.placeholder.com/300x450?text=Not+Found'
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/300x450?text=Not+Found';
            }}
            alt="Book cover"
            className=" max-w-xs max-h-[300px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-700 text-lg mt-1 mb-2">by {book.author}</p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {book.genres.map((genre, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-gray-800 mb-4">{book.description}</p>

          <button
            className={`flex items-center gap-2 mb-2 border-2 rounded-full p-2 transition-colors
              ${
                isFavourite
                  ? 'bg-[#C6A986] text-white border-[#C6A986]'
                  : 'text-gray-700 hover:text-[#C6A986] border-gray-800 hover:border-[#C6A986]'
              }`}
            onClick={handleToggleFavourite}
          >
            <Star className={`w-5 h-5 ${isFavourite ? 'fill-white' : ''}`} />
            {isFavourite ? 'Remove from Favourite' : 'Add to Favourite'}
          </button>

          <ul className="text-gray-700 text-sm space-y-1 mb-4">
            {book.releaseDate && !isNaN(new Date(book.releaseDate)) && (
              <li>
                <span className="font-semibold">Release Date:</span>{' '}
                {new Date(book.releaseDate).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </li>
            )}
            {book.pages && book.pages !== '-' && (
              <li>
                <span className="font-semibold">Pages:</span> {book.pages}
              </li>
            )}
            {book.isbn && book.isbn !== '-' && (
              <li>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </li>
            )}
            {book.language && book.language !== '-' && (
              <li>
                <span className="font-semibold">Language:</span> {book.language}
              </li>
            )}
          </ul>

          <hr className="my-4" />

          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            rows={3}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            className="bg-[#C6A986] hover:bg-[#a78e6d] text-white px-4 py-2 rounded-full transition duration-300"
            onClick={handleAddReview}
          >
            Add Review
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {book.reviews && book.reviews.length > 0 ? (
          book.reviews.map((review, idx) => (
            <div key={idx} className="flex gap-4 items-start mb-8">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <span className="font-semibold">{review.user}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </main>
  );
}

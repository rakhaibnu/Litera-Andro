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
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const normalizeReview = (review) => ({
    id: review.id,
    user: review.username, // Changed from review.user to review.username
    text: review.comment || '',
    date: review.createdAt || new Date().toISOString(),
    avatar: review.userImage || 'https://i.pravatar.cc/150?img=7',
    userId: review.userId, // testing
  });

  const handleDeleteReview = async (reviewId) => {
    if (!token || !user) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        // Remove the deleted review from state
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.id !== reviewId)
        );
        alert('Review deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete review:', err);
      if (err.response?.status === 401) {
        navigate('/signin');
      } else {
        alert(err.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${id}`
        );
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

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );
        const rawData = res.data.data || [];

        setReviews(
          rawData
            .filter((rev) => rev && (rev.comment || rev.text))
            .map(normalizeReview)
        );
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };

    fetchBookDetails();
    fetchReviews();
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

  const handleAddReview = async () => {
    if (!token || !user) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          bookId: id,
          comment: reviewText.trim(),
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        // Add new review with correct user data
        const newReview = {
          id: response.data.data.id,
          userId: user.id,
          username: user.username, // Use logged-in user's username
          comment: reviewText.trim(),
          createdAt: new Date().toISOString(),
          userImage: user.image,
        };

        setReviews((prevReviews) => [
          normalizeReview(newReview),
          ...prevReviews,
        ]);
        setReviewText('');
      }
    } catch (err) {
      console.error('Gagal menyimpan review:', err);
      if (err.response?.status === 401) {
        navigate('/signin');
      } else {
        alert(err.response?.data?.message || 'Gagal menyimpan review');
      }
    }
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
                book?.cover ||
                'https://via.placeholder.com/300x450?text=Not+Found'
              }
              alt="Book cover"
              className="w-full max-w-xs max-h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold">Book not found</h1>
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
            src={book.cover}
            alt="Book cover"
            className="max-w-xs max-h-[300px] object-cover rounded-lg shadow-lg"
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

          <div
            className="text-gray-800 mb-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: book.description }}
          />

          <button
            className={`flex items-center gap-2 mb-2 border-2 rounded-full p-2 transition-colors ${
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
            className="bg-[#C6A986] hover:bg-[#a78e6d] text-white px-4 py-2 rounded-lg transition-all"
            onClick={handleAddReview}
          >
            Submit Review
          </button>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Be the first to review this book!
              </p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {review.user}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      {user?.id === review.userId && (
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-600 hover:text-red-500 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

import { useState } from "react";
import { Search, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const books = [
    {
      id: 1,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      description: "In a dystopian future, Katniss Everdeen volunteers to take her sister's place in a deadly tournament.",
      cover: "https://via.placeholder.com/150",
      reviews: [
        {
          text: "This book is amazing! The concept is unique, action-packed, and Katniss' character is very strong.",
          user: "Suzenne Collins",
          rating: 5,
          date: "2025-03-30"
        }
      ]
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      description: "Learn how tiny changes can yield remarkable results.",
      cover: "https://via.placeholder.com/150",
      reviews: [
        {
          text: "This book changed my life!",
          user: "John Doe",
          rating: 5,
          date: "2023-05-15"
        }
      ]
    }
  ];

  // Flatten the books with their reviews for display
  const allReviews = books.flatMap(book => 
    book.reviews.map(review => ({
      ...review,
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookCover: book.cover
    }))
  );

  const filteredReviews = allReviews.filter(review =>
    review.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.bookAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return sortOption === "newest" 
      ? new Date(b.date) - new Date(a.date) 
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="container mx-auto py-24 max-w-6xl">
      {/* Header and Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Reviews</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by title, author, or genre..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-dark"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={`${review.bookId}-${review.user}`} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Book Cover */}
                  <div className="w-full md:w-1/5 flex justify-center">
                    <img 
                      src={review.bookCover} 
                      alt={review.bookTitle} 
                      className="h-48 object-cover rounded-lg shadow"
                    />
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">{review.bookTitle}</h2>
                        <p className="text-gray-600">by {review.bookAuthor}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-700 italic">"{review.text}"</p>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <Link 
                        to={`/book/${review.bookId}`}
                        className="text-dark hover:text-light font-medium"
                      >
                        See review →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
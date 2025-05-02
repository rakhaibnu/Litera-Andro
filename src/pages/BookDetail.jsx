import { useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";

export default function BookDetail() {
  const { id } = useParams();
  
  // In a real app, you would fetch this data from an API
  const books = [
    {
      id: 1,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      description: "In a dystopian future, Katniss Everdeen volunteers to take her sister's place in a deadly tournament.",
      cover: "https://via.placeholder.com/300x450",
      reviews: [
        { text: "This book is amazing! The concept is unique, action-packed.", user: "Suzenne Collins", rating: 5 },
        { text: "Couldn't put it down!", user: "Jane Doe", rating: 5 }
      ]
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      description: "Learn how tiny changes can yield remarkable results.",
      cover: "https://via.placeholder.com/300x450",
      reviews: [
        { text: "This book changed my life!", user: "John Doe", rating: 5 },
        { text: "Very insightful.", user: "Bob Smith", rating: 4 }
      ]
    }
  ];

  const book = books.find(book => book.id === Number(id)) || {
    title: "Book not found",
    author: "Unknown",
    description: "The requested book could not be found.",
    reviews: []
  };

  return (
    <main className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="w-full md:w-1/3">
          <img 
            src={book.cover} 
            alt={book.title} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        {/* Book Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600 text-xl mt-2">by {book.author}</p>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{book.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <ReviewList reviews={book.reviews} />
          </div>
        </div>
      </div>
    </main>
  );
}
import { useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";

export default function BookDetail() {
  const { id } = useParams();
  const book = { id, title: "Atomic Habits", author: "James Clear", description: "Book description here..." };
  const reviews = [
    { text: "Great book!", user: "Alice" },
    { text: "Very insightful.", user: "Bob" }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600">by {book.author}</p>
      <p className="mt-4">{book.description}</p>
      <ReviewList reviews={reviews} />
    </div>
  );
}
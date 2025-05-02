import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="bg-hero shadow-lg rounded-lg p-4 font-lato">
      <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <Link to={`/book/${book.id}`} className="text-blue-500 mt-2 block">View Details</Link>
    </div>
  );
}
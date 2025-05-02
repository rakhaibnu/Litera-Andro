import { Star } from "lucide-react";

export default function ReviewList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="border-b pb-4 last:border-0">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-gray-700">"{review.text}"</p>
            <p className="text-sm text-gray-500 mt-2">- {review.user}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
}
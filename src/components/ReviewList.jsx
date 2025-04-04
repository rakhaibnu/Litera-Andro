export default function ReviewList({ reviews }) {
    return (
      <div className="mt-4 font-lato">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="border-b py-2">
                <p className="text-gray-700">{review.text}</p>
                <span className="text-sm text-gray-500">- {review.user}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    );
  }
  
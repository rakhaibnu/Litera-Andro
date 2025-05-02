import ReviewList from "../components/ReviewList";

export default function Reviews() {
  // Data contoh - ganti dengan data dinamis
  const reviews = [
    {
      id: 1,
      bookTitle: "Atomic Habits",
      text: "This book changed my life!",
      user: "John Doe",
      rating: 5,
      date: "2023-05-15"
    },
    {
      id: 2,
      bookTitle: "Deep Work",
      text: "Very insightful for productivity",
      user: "Jane Smith",
      rating: 4,
      date: "2023-04-20"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Reviews</h1>
      
      <div className="bg-white rounded-lg shadow p-4">
        <ReviewList reviews={reviews} showBookTitle={true} />
      </div>
    </div>
  );
}
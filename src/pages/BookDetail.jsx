import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();

  // Example data, replace with API call as needed
  const books = [
    {
      id: 1,
      title: "The Hunger Games",
      author: "Suzanne Collins",
      description:
        "In the former North American territory, stands Panem with its majestic Capitol and 12 districts. Every year, the Capitol forces each district to send one boy and girl aged 12-18 to the Hunger Games, a deadly battle broadcast throughout Panem. Katniss Everdeen, a 16-year-old girl from District 12, is used to surviving by hunting for her family. When her sister is chosen, Katniss takes her place, knowing that this could be a death sentence. To survive, she must choose between survival, humanity and love.",
      cover:
        "https://m.media-amazon.com/images/I/41eShW9i3yL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
      genres: ["Adventure", "Science Fiction"],
      releaseDate: "2008-09-14",
      pages: 374,
      isbn: "978-0-439-02352-8",
      language: "English",
      reviews: [
        {
          user: "Rigi Yoga",
          date: "2025-04-02",
          avatar: "https://api.dicebear.com/7.x/personas/svg?seed=RigiYoga",
          text:
            "I'm not an avid reader of fiction novels, but this book really changed my view! The storyline was fast-paced and action-packed, I felt like I was in the game myself.",
        },
      ],
    },
    // Add more books as needed
  ];

  const book = books.find((book) => book.id === Number(id)) || {
    title: "Book not found",
    author: "Unknown",
    description: "The requested book could not be found.",
    cover: "https://via.placeholder.com/300x450",
    genres: [],
    releaseDate: "",
    pages: "",
    isbn: "",
    language: "",
    reviews: [],
  };

  // Review input state (for Add Review)
  const [reviewText, setReviewText] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <main className="container mx-auto py-20 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full max-w-xs rounded-lg shadow-lg"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-700 text-lg mt-1 mb-2">by {book.author}</p>
          <div className="flex gap-2 mb-3">
            {book.genres.map((genre) => (
              <span
                key={genre}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-gray-800 mb-4">{book.description}</p>

           <button
            className={`flex items-center gap-2 mb-2 border-2 rounded-full p-2 transition-colors
              ${isFavourite
                ? "bg-[#C6A986] text-white border-[#C6A986]"
                : "text-gray-700 hover:text-[#C6A986] border-gray-800 hover:border-[#C6A986]"
              }`}
            onClick={() => setIsFavourite((prev) => !prev)}
          >
            <Star className="w-5 h-5" />
            Add to Favourite
          </button>

          <ul className="text-gray-700 text-sm space-y-1 mb-4">
            <li>
              <span className="font-semibold">Release Date :</span>{" "}
              {book.releaseDate
                ? new Date(book.releaseDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "-"}
            </li>
            <li>
              <span className="font-semibold">Pages :</span> {book.pages || "-"}
            </li>
            <li>
              <span className="font-semibold">ISBN :</span> {book.isbn || "-"}
            </li>
            <li>
              <span className="font-semibold">Language :</span> {book.language || "-"}
            </li>
          </ul>

          <hr className="my-4" />

          {/* Add Review */}
          <textarea
            className="w-full border rounded-lg p-2 mb-2"
            rows={3}
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className="bg-[#C6A986] hover:bg-[#a78e6d] text-white px-4 py-2 rounded-full transition duration-300">
            Add Review
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        {book.reviews.map((review, idx) => (
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
                  {new Date(review.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
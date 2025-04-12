import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { CircleChevronRight } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";
import hero from "../assets/hero1.svg";

export default function Home() {
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://via.placeholder.com/150",
    },
  ];

  return (
    <main className="grow w-full">
      <div className="flex items-center  justify-between px-15  bg-hero py-5">
        <div className="flex-col font-merriweather ">
          <h1 className="text-5xl">
            Find Your Next Great Read With Trusted Reviews!
          </h1>
          <p>Dive into in-depth book reviews across various genres</p>
        </div>
        <img src={hero} alt="" className="" />
      </div>
      <div className="flex items-center justify-between px-15">
        <h1 className="text-3xl font-bold my-4">Popular Books</h1>
        <div className="flex gap-2">
          <CircleChevronLeft size={36} color="#4B5343" />
          <CircleChevronRight size={36} color="#4B5343" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-15">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex items-center justify-between px-15">
        <h1 className="text-3xl font-bold my-4">Best Book of The Year</h1>
        <div className="flex gap-2">
          <CircleChevronLeft size={36} color="#4B5343" />
          <CircleChevronRight size={36} color="#4B5343" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-15">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex items-center justify-between px-15">
        <h1 className="text-3xl font-bold my-4">Best Seller</h1>
        <div className="flex gap-2">
          <CircleChevronLeft size={36} color="#4B5343" />
          <CircleChevronRight size={36} color="#4B5343" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-15">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex items-center justify-between px-15">
        <h1 className="text-3xl font-bold my-4">New Release</h1>
        <div className="flex gap-2">
          <CircleChevronLeft size={36} color="#4B5343" />
          <CircleChevronRight size={36} color="#4B5343" />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-15 mb-10">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}

import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="group relative overflow-hidden bg-white px-6 pt-6 pb-4 shadow-xl ring-1 ring-gray-900/5 rounded-lg font-lato transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Efek latar belakang membesar */}
      <span className="absolute top-6 left-6 z-0 h-20 w-20 rounded-full bg-warm-sand-5 transition-all duration-300 group-hover:scale-[10] group-hover:opacity-100 opacity-0"></span>

      <div className="relative z-10">
        {/* Gambar dengan efek zoom saat hover */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-48 object-cover rounded-md transition-all duration-300 group-hover:scale-105"
        />

        {/* Judul buku berubah warna saat hover */}
        <h3 className="text-lg font-bold mt-2 text-gray-800 transition-all duration-300 group-hover:text-white">
          {book.title}
        </h3>

        {/* Nama penulis juga berubah warna */}
        <p className="text-gray-600 transition-all duration-300 group-hover:text-white/90">
          {book.author}
        </p>

        {/* Link tetap dengan gaya standar */}
        <Link
          to={`/book/${book.id}`}
          className="text-sky-500 mt-2 block font-semibold transition-all duration-300 group-hover:text-blue-400"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

import BookCard from '../components/BookCard';
import { CircleChevronRight } from 'lucide-react';
import { CircleChevronLeft } from 'lucide-react';
import Hero from '../assets/hero1.svg';
import LiteraLogo from '../assets/Logo.png';
import { Link } from 'react-router-dom';

export default function Home() {
  const books = [
    {
      id: 1,
      title: 'The Hunger Games',
      author: 'Suzzane Collins',
      cover: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <main className="grow w-full">
      <div className="flex items-center bg-hero pt-32 justify-between px-15 shadow-lg py-5">
        <div className="flex-col font-merriweather ">
          <h1 className="text-5xl">
            Find Your Next Great Read With Trusted Reviews!
          </h1>
          <p>Dive into in-depth book reviews across various genres</p>
        </div>
        <img src={Hero} alt="" className="h-50" />
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
      <div className="w-full bg-secondary">
        <div className="container mx-auto py-3 font-lato">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 ">
            {/* About Section */}
            <div className="flex flex-col">
              <p className="font-bold mb-3 text-deep-mocha-brown-8 text-lg">
                ABOUT
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/about-project"
                    className="hover:text-dark transition-colors"
                  >
                    About the Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/purpose"
                    className="hover:text-dark transition-colors"
                  >
                    Purpose & Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/data-source"
                    className="hover:text-dark transition-colors"
                  >
                    Data Source
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="hover:text-dark transition-colors"
                  >
                    Development Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="flex flex-col">
              <p className="font-bold mb-3 text-deep-mocha-brown-8 text-lg">
                RESOURCES
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-dark transition-colors"
                  >
                    About the Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-to-review"
                    className="hover:text-dark transition-colors"
                  >
                    How to Review
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="hover:text-dark transition-colors"
                  >
                    Book Categories List
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Section */}
            <div className="flex flex-col">
              <p className="font-bold mb-3 text-deep-mocha-brown-8 text-lg">
                COMMUNITY
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/forum"
                    className="hover:text-dark transition-colors"
                  >
                    Reader Forum
                  </Link>
                </li>
                <li>
                  <Link
                    to="/suggestion"
                    className="hover:text-dark transition-colors"
                  >
                    Send Suggestion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/join"
                    className="hover:text-dark transition-colors"
                  >
                    Join Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h5 className="font-bold mb-3 text-deep-mocha-brown-8 text-lg">
                CONTACT
              </h5>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-dark transition-colors">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="hover:text-dark transition-colors">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-dark transition-colors">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
              <h5 className="font-bold mb-3 text-deep-mocha-brown-8 text-lg">
                SUPPORT
              </h5>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link to="/faq" className="hover:text-dark transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search-guide"
                    className="hover:text-dark transition-colors"
                  >
                    Search Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-8 justify-center">
              <img
                src={LiteraLogo || '/placeholder.svg'}
                alt="Litera Logo"
                className="h-25 "
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

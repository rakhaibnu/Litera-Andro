import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex justify-center items-center">
      <nav 
        className={`
          transition-all duration-300 ease-in-out z-10
          ${scrolled 
            ? "bg-white backdrop-blur-2xl shadow-md w-[50%] rounded-full mt-2 px-2 py-3 z-50" 
            : "bg-transparent py-4 w-full"}
          flex justify-between items-center px-6
        `}
      >
        {/* Logo section */}
        <div className="flex items-center">
          <Logo to="/" /> 
          {!scrolled && (
            <Link to="/" className="text-2xl font-bold ml-2">LITERA</Link>
          )}    
        </div>
        
        {/* Menu section */}
        <div className="flex items-center text-black space-x-6 font-lato">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/Books" className="hover:text-gray-600">Books</Link>
          <Link to="/Review" className="hover:text-gray-600">Reviews</Link>
          <Link 
            to="/Signin" 
            className="bg-light px-4 py-2 rounded-full border-0 hover:bg-dark hover:text-white transition duration-300"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
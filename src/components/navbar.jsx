import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    // Initial check
    checkUserData();

    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', checkUserData);
    };
  }, [scrolled]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // Update state
        setUser(null);
        
        // Navigate to signin page
        navigate('/signin');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear storage and redirect even if server request fails
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/signin');
    }
  };

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
          {user ? (
            <div className="relative group">
              <button 
                className="bg-light px-4 py-2 rounded-full border-0 hover:bg-dark hover:text-white transition duration-300"
              >
                {user.username}
              </button>
              <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/signin" 
              className="bg-light px-4 py-2 rounded-full border-0 hover:bg-dark hover:text-white transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
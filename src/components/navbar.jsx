import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-hero p-4 shadow-md font-merriweather px-15 ">
      <div className="container mx-auto flex items-center">
      <Logo className="text-blue-500"/> 
        <Link to="/" className="text-2xl font-bold text-black flex justify-self-start">LITERA</Link>
        </div>
        <div className="flex items-center text-black space-x-5 font-lato ">
          <Link to="/" className="">Home</Link>
          <Link to="/Book" className="">Books</Link>
          <Link to="/Reviews" className="">Reviews</Link>
          <Link to="/profile" className= "bg-light px-4 py-2 rounded-full border-0 hover:bg-dark hover:text-white transition duration-300">Login</Link>
        </div> 
    </nav>
  );
}
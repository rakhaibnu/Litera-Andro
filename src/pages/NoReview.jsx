import ImageEmpty from "../assets/empty.png";
import { Link } from "react-router-dom";

export default function NoReview() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-merriweather gap-4">
        <h1 className="text-5xl ">There are no reviews here yet</h1>
        <p className="font-lato">Find a book you love and share your thoughts</p>
        <img src={ImageEmpty} alt="No Reviews" className="w-2xs pt-4" />
        
        <Link to="/review" className="mt-6 bg-warm-sand-5 hover:bg-dark text-white text-lg px-4 py-2 rounded-full transition duration-300">
            Go review a book
        </Link>
        </div>
    );
}
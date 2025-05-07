import ImageNoLogin from "../assets/noLogin.png";
import { Link } from "react-router-dom";

export default function NoLogin() {
    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-100 font-merriweather gap-4 py-20">
        <h1 className="text-5xl px-80 text-center">Log in to see full reviews and participate!</h1>
        <img src={ImageNoLogin} alt="No login" className="w-2xs pt-4" />
        
        <Link to="/Signin" className="w-50 mt-6 bg-warm-sand-6 hover:bg-dark text-white text-lg px-4 py-2 rounded-full transition duration-300 text-center">
            Login
        </Link>
        </div>
    );
}
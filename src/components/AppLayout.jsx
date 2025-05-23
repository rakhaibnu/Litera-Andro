import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
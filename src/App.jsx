import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Index";
import BookDetail from "./pages/BookDetail";
import Navbar from "./components/navbar";
import Profile from "./pages/Profile";
import Footer from "./components/footer";

export default function App() {
  return (
    <Router>{/* Pastikan Navbar ada di sini */}
    <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
      <Footer />
    </Router>  
  );
}

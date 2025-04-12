import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Index";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>{/* Pastikan Navbar ada di sini */}
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="book/:id" element={<BookDetail />} />
          </Route>
        </Routes>
    </Router>  
  );
}

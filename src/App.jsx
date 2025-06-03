import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Index from './pages/Index';
import Review from './pages/Review';
import NoReview from './pages/NoReview';
import NoLogin from './pages/NoLogin';
import Profile from './pages/profile';
import Security from './pages/Security';
import Favorites from './pages/Favorites';
import Editprofile from './pages/Editprofile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Index />} />
          <Route path="books" element={<Books />} />
          <Route path="review" element={<Review />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="noreview" element={<NoReview />} />
          <Route path="nologin" element={<NoLogin />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="editprofile" element={<Editprofile />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

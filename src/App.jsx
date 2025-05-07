import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Index from './pages/Index';
import Review from './pages/Review';
import NoReview from './pages/NoReview';

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
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

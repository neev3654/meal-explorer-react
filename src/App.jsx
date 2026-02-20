// Main App component that handles routing and global state providers
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LikedProvider } from './context/LikedContext';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import MealDetailPage from './pages/MealDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import LikedPage from './pages/LikedPage';

export default function App() {
  return (
    <LikedProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/meal/:id" element={<MealDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/liked" element={<LikedPage />} />
          {/* Fallback */}
          <Route path="*" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </LikedProvider>
  );
}

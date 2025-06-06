import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import CheckboxFilter from '../components/CheckboxFilter';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { FunnelIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Books() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    categories: {
      popularBook: false,
      bestBook: false,
      bestSeller: false,
      newRelease: false,
    },
    bookType: {
      fiction: false,
      nonFiction: false,
    },
    genres: {
      // Fiction genres
      fantasy: false,
      scienceFiction: false,
      mysteryThriller: false,
      romance: false,
      historicalFiction: false,
      horror: false,
      adventure: false,
      youngAdult: false,
      // Non-fiction genres
      biographyMemoir: false,
      history: false,
      selfHelp: false,
      scienceTechnology: false,
      psychology: false,
      businessEconomics: false,
      politics: false,
      philosophy: false,
      travel: false,
    },
  });

  const [activeFilters, setActiveFilters] = useState({
    categories: {},
    bookType: {},
    genres: {},
  });

  const activeFilterCount = Object.values(filters).reduce((count, category) => {
    return count + Object.values(category).filter(Boolean).length;
  }, 0);

  const handleFilterChange = (category, filterName) => {
    setFilters({
      ...filters,
      [category]: {
        ...filters[category],
        [filterName]: !filters[category][filterName],
      },
    });
  };

  // Fetch books from API
  // Fetch books from API
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      // Log untuk debugging
      console.log("API URL:", import.meta.env.VITE_API_URL);
      console.log("Full URL:", `${import.meta.env.VITE_API_URL}/books/search?q=laut%20bercerita`);
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/search?q=laut%20bercerita`
      );
      
      console.log("Response:", response.data);
      
      // Tambahkan kode ini untuk mengubah data API dan mengatur state books
      if (response.data && response.data.books) {
        const transformedBooks = response.data.books.map((book) => ({
          id: book.id || Math.random().toString(),
          title: book.title || "Unknown Title",
          author: book.authors || "Unknown Author",
          cover: book.thumbnail || 'https://via.placeholder.com/150',
          rating: book.rating || 0,
          categories: book.categories || [],
          bookType: book.fiction ? 'fiction' : 'nonFiction',
          genres: book.genres || [],
        }));
        
        setBooks(transformedBooks);
      } else if (response.data) {
        // Jika struktur API berbeda (tidak memiliki property books)
        const transformedBooks = Array.isArray(response.data) 
          ? response.data.map((book) => ({
              id: book.id || Math.random().toString(),
              title: book.title || "Unknown Title",
              author: book.author || "Unknown Author",
              cover: book.thumbnail || 'https://via.placeholder.com/150',
              rating: book.rating || 0,
              categories: book.categories || [],
              bookType: book.fiction ? 'fiction' : 'nonFiction',
              genres: book.genres || [],
            }))
          : [];
          
        setBooks(transformedBooks);
      }
      
      setError(null);
    } catch (error) {
      console.error("Error details:", error);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []); // Hapus titik koma ekstra di sini

  const resetFilters = () => {
    setFilters({
      categories: {
        popularBook: false,
        bestBook: false,
        bestSeller: false,
        newRelease: false,
      },
      bookType: {
        fiction: false,
        nonFiction: false,
      },
      genres: {
        fantasy: false,
        scienceFiction: false,
        mysteryThriller: false,
        romance: false,
        historicalFiction: false,
        horror: false,
        adventure: false,
        youngAdult: false,
        biographyMemoir: false,
        history: false,
        selfHelp: false,
        scienceTechnology: false,
        psychology: false,
        businessEconomics: false,
        politics: false,
        philosophy: false,
        travel: false,
      },
    });

    setActiveFilters({
      categories: {},
      bookType: {},
      genres: {},
    });

    setFilterApplied(false);
  };

  // Fungsi untuk menerapkan filter
  const applyFilter = () => {
    // Salin filter yang dipilih ke activeFilters
    setActiveFilters({
      categories: { ...filters.categories },
      bookType: { ...filters.bookType },
      genres: { ...filters.genres },
    });

    // Set flag bahwa filter telah diterapkan
    setFilterApplied(true);
  };

  // Filter buku berdasarkan kriteria
  const filteredBooks = books.filter((book) => {
    // Filter berdasarkan search query
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    // Jika filter belum diterapkan, hanya gunakan search query
    if (!filterApplied) {
      return matchesSearch;
    }

    // Cek apakah ada filter yang aktif
    const hasActiveFilters = Object.values(activeFilters).some((category) =>
      Object.values(category).some((value) => value === true)
    );

    // Jika tidak ada filter yang aktif, kembalikan hasil search saja
    if (!hasActiveFilters) {
      return matchesSearch;
    }

    // Cek kategori (jika ada yang dipilih)
    const activeCategories = Object.entries(activeFilters.categories)
      .filter(([key, isActive]) => isActive)
      .map(([category]) => category);

    const matchesCategory =
      activeCategories.length === 0 ||
      (book.categories &&
        activeCategories.some((cat) => book.categories.includes(cat)));

    // Cek tipe buku (jika ada yang dipilih)
    const activeBookTypes = Object.entries(activeFilters.bookType)
      .filter(([key, isActive]) => isActive)
      .map(([type]) => type);

    const matchesBookType =
      activeBookTypes.length === 0 ||
      (book.bookType && activeBookTypes.includes(book.bookType));

    // Cek genre (jika ada yang dipilih)
    const activeGenres = Object.entries(activeFilters.genres)
      .filter(([key, isActive]) => isActive)
      .map(([genre]) => genre);

    const matchesGenre =
      activeGenres.length === 0 ||
      (book.genres &&
        activeGenres.some((genre) => book.genres.includes(genre)));

    // Buku harus memenuhi semua kriteria yang dipilih
    return matchesSearch && matchesCategory && matchesBookType && matchesGenre;
  });

  return (
    <div className="min-h-screen p-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/3 bg-latte-cream-2 rounded-3xl border-latte-cream-10 border p-6">
          <h2 className="font-merriweather font-bold text-2xl mb-6 text-center">
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filters content - no changes needed here */}
            <div>
              <h3 className="font-merriweather font-bold text-lg mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                <CheckboxFilter
                  id="popular-book"
                  label="Popular Book"
                  checked={filters.categories.popularBook}
                  onChange={() =>
                    handleFilterChange('categories', 'popularBook')
                  }
                />
                <CheckboxFilter
                  id="best-book"
                  label="Best Book of the Year"
                  checked={filters.categories.bestBook}
                  onChange={() => handleFilterChange('categories', 'bestBook')}
                />
                <CheckboxFilter
                  id="best-seller"
                  label="Best Seller"
                  checked={filters.categories.bestSeller}
                  onChange={() =>
                    handleFilterChange('categories', 'bestSeller')
                  }
                />
                <CheckboxFilter
                  id="new-release"
                  label="New Release"
                  checked={filters.categories.newRelease}
                  onChange={() =>
                    handleFilterChange('categories', 'newRelease')
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="font-merriweather font-bold text-lg mb-3">
                Book Type
              </h3>
              <div className="space-y-1">
                <CheckboxFilter
                  id="fiction"
                  label="Fiction"
                  checked={filters.bookType.fiction}
                  onChange={() => handleFilterChange('bookType', 'fiction')}
                />
                <CheckboxFilter
                  id="non-fiction"
                  label="Non Fiction"
                  checked={filters.bookType.nonFiction}
                  onChange={() => handleFilterChange('bookType', 'nonFiction')}
                />
              </div>
            </div>

            <div className="col-span-2">
              <h3 className="font-merriweather font-bold text-lg mb-3">
                Genres
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="space-y-2">
                  <CheckboxFilter
                    id="fantasy"
                    label="Fantasy"
                    checked={filters.genres.fantasy}
                    onChange={() => handleFilterChange('genres', 'fantasy')}
                  />
                  {/* Other fiction genres... */}
                </div>
                
                <div className="space-y-2">
                  <CheckboxFilter
                    id="biography-memoir"
                    label="Biography & Memoir"
                    checked={filters.genres.biographyMemoir}
                    onChange={() =>
                      handleFilterChange('genres', 'biographyMemoir')
                    }
                  />
                  {/* Other non-fiction genres... */}
                </div>
              </div>
            </div>

            <div className="col-span-2 flex justify-center gap-4 mt-4">
              <Button
                text="Reset Filter"
                onClick={resetFilters}
                leftIcon={
                  <ArrowUturnLeftIcon className="w-6 h-6 text-gray-500" />
                }
                className={`
                  flex cursor-pointer rounded-lg font-lato font-regular py-2 px-6 transition duration-300
                  ${
                    activeFilterCount > 0
                      ? 'bg-red-200 hover:bg-red-300'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                  text-charcoal-gray-4
                `}
                disabled={activeFilterCount === 0}
              />
              <Button
                text="Apply Filter"
                onClick={applyFilter}
                leftIcon={<FunnelIcon className="w-6 h-6 text-gray-500" />}
                className={`
                  flex cursor-pointer rounded-lg font-lato font-regular py-2 px-6 transition duration-300
                  ${
                    activeFilterCount > 0
                      ? 'bg-apply hover:bg-blue-400'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  } 
                  text-charcoal-gray-4
                `}
                disabled={activeFilterCount === 0}
              />
            </div>

            {activeFilterCount > 0 && (
              <div className="col-span-2 text-center mt-2 text-sm text-charcoal-gray-4">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}{' '}
                selected
              </div>
            )}
          </div>
        </aside>

        <main className="w-full md:w-2/3">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by title or author..."
          />

          {filterApplied && activeFilterCount > 0 && (
            <div className="mt-4 flex justify-between items-center bg-warm-sand-2 p-3 rounded-lg">
              <div>
                <span className="font-medium">Filters applied:</span>{' '}
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-warm-sand-6 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-warm-sand-6"></div>
            </div>
          ) : error ? (
            <div className="mt-6 text-center text-red-500">{error}</div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}

              {filteredBooks.length === 0 && (
                <p className="col-span-full text-center text-gray-500 mt-8">
                  No books found. Try adjusting your filters or search query.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
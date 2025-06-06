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

  const [activeFilters, setActiveFilters] = useState({
    categories: {},
    bookType: {},
    genres: {}
  });

  const [books, setBooks] = useState([]);
  const activeFilterCount = Object.values(filters).reduce((count, category) => {
    return count + Object.values(category).filter(Boolean).length;
  }, 0);

  const handleFilterChange = (category, filterName) => {
    setFilters({
      ...filters,
      [category]: {
        ...filters[category],
        [filterName]: !filters[category][filterName]
      }
    });
  };

  const resetFilters = () => {
    setFilters({
      categories: {
        popularBook: false,
        bestBook: false,
        bestSeller: false,
        newRelease: false
      },
      bookType: {
        fiction: false,
        nonFiction: false
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
        travel: false
      }
    });

    setActiveFilters({
      categories: {},
      bookType: {},
      genres: {}
    });

    setFilterApplied(false);
  };

  const ApplyFilter = () => {
    setActiveFilters({
      categories: { ...filters.categories },
      bookType: { ...filters.bookType },
      genres: { ...filters.genres }
    });
    setFilterApplied(true);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) return;

      try {
        const params = new URLSearchParams({ q: searchQuery });
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/search?${params.toString()}`);

        if (response.data && response.data.books) {
          const transformed = response.data.books.map(book => ({
            id: book.id || Math.random().toString(),
            title: book.title || "Unknown Title",
            author: book.authors?.join(', ') || "Unknown Author",
            cover: book.thumbnail || 'https://via.placeholder.com/150',
            rating: book.rating || 0,
            categories: book.categories || [],
            bookType: book.fiction ? 'fiction' : 'nonFiction',
            genres: book.genre || []
          }));

          setBooks(transformed);
        }
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };

    fetchBooks();
  }, [searchQuery]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    if (!filterApplied) return matchesSearch;

    const hasActiveFilters = Object.values(activeFilters).some(category =>
      Object.values(category).some(value => value === true)
    );

    if (!hasActiveFilters) return matchesSearch;

    const activeCategories = Object.entries(activeFilters.categories)
      .filter(([key, isActive]) => isActive)
      .map(([category]) => category);

    const matchesCategory = activeCategories.length === 0 ||
      (book.categories && activeCategories.some(cat => book.categories.includes(cat)));

    const activeBookTypes = Object.entries(activeFilters.bookType)
      .filter(([key, isActive]) => isActive)
      .map(([type]) => type);

    const matchesBookType = activeBookTypes.length === 0 ||
      (book.bookType && activeBookTypes.includes(book.bookType));

    const activeGenres = Object.entries(activeFilters.genres)
      .filter(([key, isActive]) => isActive)
      .map(([genre]) => genre);

    const matchesGenre = activeGenres.length === 0 ||
      (book.genres && activeGenres.some(genre => book.genres.includes(genre)));

    return matchesSearch && matchesCategory && matchesBookType && matchesGenre;
  });

  return (
    <div className="min-h-screen p-4 pt-24 md:pt-28">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Filter section (unchanged) */}
        {/* ... Paste your filter section code here ... */}

        <main className="w-full md:w-2/3">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by title or author..."
          />

          {filterApplied && activeFilterCount > 0 && (
            <div className="mt-4 flex justify-between items-center bg-warm-sand-2 p-3 rounded-lg">
              <div>
                <span className="font-medium">Filters applied:</span> {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}
              </div>
              <button
                onClick={resetFilters}
                className="text-sm text-warm-sand-6 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

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
        </main>
      </div>
    </div>
  );
}

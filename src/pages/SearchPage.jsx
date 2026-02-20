import { useState, useEffect } from 'react';
import MealCard from '../components/MealCard';
import SearchIcon from '../assets/icons/search.svg';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Default: load meals starting with 'a'
    useEffect(() => {
        fetchByLetter('a');
    }, []);

    async function fetchByLetter(letter) {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${BASE}/search.php?f=${letter}`);
            const data = await res.json();
            setMeals(data.meals ?? []);
        } catch {
            setError('Failed to load meals. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        const term = query.trim();
        if (!term) {
            fetchByLetter('a');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(term)}`);
            const data = await res.json();
            setMeals(data.meals ?? []);
        } catch {
            setError('Failed to search meals. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="page">
            <div className="hero-banner">
                <h1>Discover <span>Delicious</span> Meals</h1>
                <p>Explore thousands of recipes from around the world.</p>
            </div>

            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search for a meal… (e.g. Sushi, Pasta)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    <img src={SearchIcon} alt="" className="btn-icon" /> Search
                </button>
            </form>

            {loading && (
                <div className="loading-wrap">
                    <div className="spinner" />
                    <p>Loading meals…</p>
                </div>
            )}

            {error && (
                <div className="empty-state">
                    <span className="empty-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && meals.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon">🍽️</span>
                    <p>No meals found</p>
                    <small>Try a different search term.</small>
                </div>
            )}

            {!loading && !error && meals.length > 0 && (
                <>
                    <p className="page-subtitle">{meals.length} meal{meals.length !== 1 ? 's' : ''} found</p>
                    <div className="meal-grid">
                        {meals.map((meal) => (
                            <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

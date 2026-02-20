// CategoriesPage component to browse meals by category
import { useState, useEffect } from 'react';
import CategoriesIcon from '../assets/icons/categories.svg';

const BASE = 'https://www.themealdb.com/api/json/v1/1';
const DESC_LIMIT = 120;

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${BASE}/categories.php`)
            .then((r) => r.json())
            .then((data) => setCategories(data.categories ?? []))
            .catch(() => setError('Failed to load categories. Please try again.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page">
            <h1 className="page-title">
                <img src={CategoriesIcon} alt="" className="page-title-icon" /> Meal Categories
            </h1>
            <p className="page-subtitle">Browse all available meal categories from around the world.</p>

            {loading && (
                <div className="loading-wrap">
                    <div className="spinner" />
                    <p>Loading categories…</p>
                </div>
            )}

            {error && (
                <div className="empty-state">
                    <span className="empty-icon">⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="category-grid">
                    {categories.map((cat) => {
                        const desc = cat.strCategoryDescription ?? '';
                        const trimmed =
                            desc.length > DESC_LIMIT ? desc.slice(0, DESC_LIMIT).trimEnd() + '…' : desc;

                        return (
                            <div className="category-card" key={cat.idCategory}>
                                <img
                                    src={cat.strCategoryThumb}
                                    alt={cat.strCategory}
                                    loading="lazy"
                                />
                                <h3>{cat.strCategory}</h3>
                                <p>{trimmed}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

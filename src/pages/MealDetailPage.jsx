import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLiked } from '../context/LikedContext';
import LikedIcon from '../assets/icons/liked.svg';

const BASE = 'https://www.themealdb.com/api/json/v1/1';
const MAX_INSTRUCTIONS = 600;

function getIngredients(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
            list.push({ ingredient: ing.trim(), measure: meas?.trim() ?? '' });
        }
    }
    return list;
}

export default function MealDetailPage() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showFull, setShowFull] = useState(false);
    const { isLiked, toggleLike } = useLiked();

    useEffect(() => {
        setLoading(true);
        setError('');
        fetch(`${BASE}/lookup.php?i=${id}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.meals) setMeal(data.meals[0]);
                else setError('Meal not found.');
            })
            .catch(() => setError('Failed to load meal details.'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="page">
                <div className="loading-wrap">
                    <div className="spinner" />
                    <p>Loading meal details…</p>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="page">
                <div className="empty-state">
                    <span className="empty-icon">⚠️</span>
                    <p>{error}</p>
                    <Link to="/" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                        ← Back to Search
                    </Link>
                </div>
            </div>
        );

    if (!meal) return null;

    const ingredients = getIngredients(meal);
    const liked = isLiked(meal.idMeal);
    const instructions = meal.strInstructions ?? '';
    const shortened = instructions.slice(0, MAX_INSTRUCTIONS);
    const isLong = instructions.length > MAX_INSTRUCTIONS;

    return (
        <div className="page">
            <Link to="/" className="back-link">← Back to Search</Link>

            <div className="detail-hero">
                <img className="detail-hero-img" src={meal.strMealThumb} alt={meal.strMeal} />

                <div className="detail-info">
                    <h1>{meal.strMeal}</h1>

                    <div className="detail-meta">
                        {meal.strCategory && <span className="tag accent">🍽️ {meal.strCategory}</span>}
                        {meal.strArea && <span className="tag">🌍 {meal.strArea}</span>}
                        {meal.strTags &&
                            meal.strTags.split(',').map((t) => (
                                <span key={t} className="tag">{t.trim()}</span>
                            ))}
                    </div>

                    <button
                        className={`like-btn ${liked ? 'liked' : 'unliked'}`}
                        style={{ marginBottom: '1.5rem' }}
                        onClick={() => toggleLike(meal.idMeal)}
                    >
                        <img 
                            src={LikedIcon} 
                            alt="" 
                            className="btn-icon"
                        />
                        <span>{liked ? 'Liked' : 'Like this meal'}</span>
                    </button>

                    {/* Ingredients */}
                    <div className="detail-section">
                        <h2>Ingredients ({ingredients.length})</h2>
                        <ul className="ingredients-list">
                            {ingredients.map((item, i) => (
                                <li key={i}>
                                    {item.measure && <strong>{item.measure} </strong>}
                                    {item.ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="detail-section">
                <h2>Instructions</h2>
                <p className="instructions-text">
                    {showFull || !isLong ? instructions : shortened + '…'}
                </p>
                {isLong && (
                    <button
                        className="btn btn-outline btn-sm"
                        style={{ marginTop: '0.75rem' }}
                        onClick={() => setShowFull((v) => !v)}
                    >
                        {showFull ? 'Show Less ▲' : 'Read More ▼'}
                    </button>
                )}
            </div>

            {meal.strYoutube && (
                <div className="detail-section">
                    <h2>Video Recipe</h2>
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                    >
                        ▶ Watch on YouTube
                    </a>
                </div>
            )}
        </div>
    );
}

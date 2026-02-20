import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiked } from '../context/LikedContext';
import LikedIcon from '../assets/icons/liked.svg';

const BASE = 'https://www.themealdb.com/api/json/v1/1';

export default function LikedPage() {
    const { likedIds, removeLike } = useLiked();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (likedIds.length === 0) {
            setMeals([]);
            return;
        }

        setLoading(true);

        Promise.all(
            likedIds.map((id) =>
                fetch(`${BASE}/lookup.php?i=${id}`)
                    .then((r) => r.json())
                    .then((data) => data.meals?.[0] ?? null)
                    .catch(() => null)
            )
        )
            .then((results) => setMeals(results.filter(Boolean)))
            .finally(() => setLoading(false));
    }, [likedIds]);

    return (
        <div className="page">
            <div className="liked-header">
                <div>
                    <h1 className="page-title">
                        <img src={LikedIcon} alt="" className="page-title-icon" /> Liked Meals
                    </h1>
                    <p className="page-subtitle" style={{ marginBottom: 0 }}>
                        {likedIds.length === 0
                            ? 'You have not liked any meals yet.'
                            : `${likedIds.length} meal${likedIds.length !== 1 ? 's' : ''} saved`}
                    </p>
                </div>
            </div>

            {loading && (
                <div className="loading-wrap">
                    <div className="spinner" />
                    <p>Loading your liked meals…</p>
                </div>
            )}

            {!loading && likedIds.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon">🤍</span>
                    <p>No liked meals yet.</p>
                    <small>Go to Search and hit Like on a meal!</small>
                    <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '1rem' }}
                        onClick={() => navigate('/')}
                    >
                        Browse Meals
                    </button>
                </div>
            )}

            {!loading && meals.length > 0 && (
                <div className="meal-grid">
                    {meals.map((meal) => (
                        <div className="meal-card" key={meal.idMeal}>
                            <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
                            <div className="meal-card-body">
                                <h3>{meal.strMeal}</h3>
                                <span className="category-tag">{meal.strCategory}</span>
                                <div className="meal-card-actions">
                                    <button
                                        className="like-btn liked"
                                        onClick={() => removeLike(meal.idMeal)}
                                        title="Remove from liked"
                                    >
                                        <img src={LikedIcon} alt="" className="btn-icon" /> 
                                        <span>Remove</span>
                                    </button>
                                    <button
                                        className="btn btn-outline btn-sm"
                                        style={{ flex: 1 }}
                                        onClick={() => navigate(`/meal/${meal.idMeal}`)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

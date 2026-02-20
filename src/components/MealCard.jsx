// MealCard component to display individual meal summaries
import { useNavigate } from 'react-router-dom';
import { useLiked } from '../context/LikedContext';
import LikedIcon from '../assets/icons/liked.svg';

export default function MealCard({ meal }) {
    const navigate = useNavigate();
    const { isLiked, toggleLike } = useLiked();

    const liked = isLiked(meal.idMeal);

    return (
        <div className="meal-card">
            <div className="img-wrap">
                <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
            </div>
            <div className="meal-card-body">
                <h3>{meal.strMeal}</h3>
                <span className="category-tag">{meal.strCategory}</span>
                <div className="meal-card-actions">
                    <button
                        className={`like-btn ${liked ? 'liked' : 'unliked'}`}
                        onClick={() => toggleLike(meal.idMeal)}
                        title={liked ? 'Unlike' : 'Like'}
                    >
                        <img
                            src={LikedIcon}
                            alt=""
                            className="btn-icon"
                        />
                        <span>{liked ? 'Liked' : 'Like'}</span>
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate(`/meal/${meal.idMeal}`)}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

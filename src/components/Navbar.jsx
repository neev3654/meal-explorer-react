// Navigation component with links and liked meals badge
import { NavLink } from 'react-router-dom';
import { useLiked } from '../context/LikedContext';
import SearchIcon from '../assets/icons/search.svg';
import CategoriesIcon from '../assets/icons/categories.svg';
import LikedIcon from '../assets/icons/liked.svg';

export default function Navbar() {
    const { likedIds } = useLiked();

    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">
                🍽️ MealExplorer
            </NavLink>

            <ul className="nav-links">
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <img src={SearchIcon} alt="" className="nav-icon" /> Search
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/categories"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <img src={CategoriesIcon} alt="" className="nav-icon" /> Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/liked"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        <img src={LikedIcon} alt="" className="nav-icon" /> Liked Meals
                        {likedIds.length > 0 && (
                            <span className="liked-badge">{likedIds.length}</span>
                        )}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

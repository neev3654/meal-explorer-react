# 🍽️ Meal Explorer

A sleek, luxury-themed meal discovery app built with **React + Vite**. Browse thousands of recipes powered by [TheMealDB API](https://www.themealdb.com/), filter by category or first letter, save your favourites, and dive into rich step-by-step meal details — all without ever refreshing the page.

---

## ✨ Features

- 🔍 **Search Meals** — Instantly search meals by name using a live API query
- 🔤 **Filter by Letter** — Browse meals alphabetically with a single click
- 🗂️ **Browse Categories** — Explore all meal categories with images and descriptions
- 📄 **Meal Detail View** — Full ingredient list, instructions, tags, origin, and a YouTube recipe link
- ❤️ **Like / Unlike Meals** — Save your favourite meals; persisted in `localStorage`
- 💛 **Liked Meals Page** — View and manage all your liked meals in one place
- 🔢 **Live Like Counter** — Navbar badge updates in real-time as you like meals
- 📱 **Responsive Design** — Works smoothly across desktop and mobile screens

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI Library |
| [Vite 7](https://vitejs.dev/) | Build tool & dev server |
| [React Router v7](https://reactrouter.com/) | Client-side routing |
| [TheMealDB API](https://www.themealdb.com/api.php) | Meal data source |
| `localStorage` | Persisting liked meals |
| Vanilla CSS | Custom luxury dark theme |
| Google Fonts (Playfair Display + Inter) | Typography |

---

## 📁 Project Structure

```
meal-explorer/
├── public/
├── src/
│   ├── assets/
│   │   └── icons/          # SVG icons (liked, search, etc.)
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed navbar with liked badge
│   │   └── MealCard.jsx     # Reusable meal card with like + view details
│   ├── context/
│   │   └── LikedContext.jsx # Global liked meals state via Context API
│   ├── pages/
│   │   ├── SearchPage.jsx       # Home / search page
│   │   ├── MealDetailPage.jsx   # Full meal detail view
│   │   ├── LikedPage.jsx        # All liked meals
│   │   └── CategoriesPage.jsx   # Meal categories grid
│   ├── App.jsx              # Route definitions
│   ├── main.jsx             # App entry point
│   ├── index.css            # Global luxury dark theme styles
│   └── App.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** installed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/neev3654/meal-explorer-react.git

# 2. Navigate into the project
cd meal-explorer-react

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

---

## 🌐 API Reference

This app uses the free [TheMealDB API v1](https://www.themealdb.com/api.php).

| Endpoint | Usage |
|---|---|
| `/search.php?s={name}` | Search meals by name |
| `/filter.php?f={letter}` | Filter meals by first letter |
| `/categories.php` | Fetch all meal categories |
| `/lookup.php?i={id}` | Get full details of a single meal |

---

## 🗺️ Routes

| Path | Page |
|---|---|
| `/` | Search & browse meals |
| `/meal/:id` | Full meal detail page |
| `/liked` | Liked / saved meals |
| `/categories` | All meal categories |

---

## 🎨 Design Highlights

- **Luxury dark theme** — Black × charcoal × gold palette
- **Glassmorphism navbar** with backdrop blur
- **Micro-animations** — card hover lift, image zoom, button scale
- **Gold accent system** — glows, gradients, and borders
- **Playfair Display** serif for headings; **Inter** for body text

---

## 📸 Screenshots

> Search Page  
> ![Search](https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [TheMealDB](https://www.themealdb.com/) for the free meals API
- [Google Fonts](https://fonts.google.com/) for Playfair Display & Inter

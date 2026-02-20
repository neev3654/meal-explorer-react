import { createContext, useContext, useState, useCallback } from 'react';

const LikedContext = createContext();

const STORAGE_KEY = 'meal_explorer_liked';

function getLikedFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function LikedProvider({ children }) {
  const [likedIds, setLikedIds] = useState(getLikedFromStorage);

  const toggleLike = useCallback((id) => {
    setLikedIds((prev) => {
      const strId = String(id);
      const next = prev.includes(strId)
        ? prev.filter((x) => x !== strId)
        : [...prev, strId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isLiked = useCallback(
    (id) => likedIds.includes(String(id)),
    [likedIds]
  );

  const removeLike = useCallback((id) => {
    setLikedIds((prev) => {
      const next = prev.filter((x) => x !== String(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <LikedContext.Provider value={{ likedIds, toggleLike, isLiked, removeLike }}>
      {children}
    </LikedContext.Provider>
  );
}

export function useLiked() {
  return useContext(LikedContext);
}

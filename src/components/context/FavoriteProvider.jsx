import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();
function FavoriteProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState(
    JSON.parse(localStorage.getItem("FAVORITE")) || []
  );
  localStorage.setItem("FAVORITE", JSON.stringify(favoriteList));
  return (
    <FavoriteContext.Provider value={{ favoriteList, setFavoriteList }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteProvider;

export function useFavoriteList() {
  return useContext(FavoriteContext);
}

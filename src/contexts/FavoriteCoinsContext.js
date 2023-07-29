import React, { createContext, useContext, useState } from "react";

const FavoriteCoinsContext = createContext();

export const useFavoriteCoins = () => useContext(FavoriteCoinsContext);

export const FavoriteCoinsProvider = ({ children }) => {
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  const toggleFavorite = (uuid) => {
    setFavoriteCoins((prevFavoriteCoins) => {
      if (prevFavoriteCoins.includes(uuid)) {
        return prevFavoriteCoins.filter((favUuid) => favUuid !== uuid);
      } else {
        return [...prevFavoriteCoins, uuid];
      }
    });
  };

  return (
    <FavoriteCoinsContext.Provider value={{ favoriteCoins, toggleFavorite }}>
      {children}
    </FavoriteCoinsContext.Provider>
  );
};

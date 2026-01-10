import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within FavoritesProvider");
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("g-crown-favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("g-crown-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            if (prev.find((item) => item.id === product.id)) {
                return prev;
            }
            return [...prev, product];
        });
    };
    const clearFavorites = () => {
  setFavorites([]);
};
    const removeFromFavorites = (productId) => {
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    };

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isFavorite = (productId) => {
        return favorites.some((item) => item.id === productId);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                toggleFavorite,
                isFavorite,
                clearFavorites
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

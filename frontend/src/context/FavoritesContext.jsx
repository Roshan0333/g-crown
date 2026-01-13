import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosPostService, axiosPutService, axiosGetService } from "../services/axios";

// const FavoritesContext = createContext();

// export const useFavorites = () => {
//     const context = useContext(FavoritesContext);
//     if (!context) {
//         throw new Error("useFavorites must be used within FavoritesProvider");
//     }
//     return context;
// };

// export const FavoritesProvider = ({ children }) => {
//     const [favorites, setFavorites] = useState(() => {
//         const saved = localStorage.getItem("g-crown-favorites");
//         return saved ? JSON.parse(saved) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem("g-crown-favorites", JSON.stringify(favorites));
//     }, [favorites]);

//     const addToFavorites = (product) => {
//         setFavorites((prev) => {
//             if (prev.find((item) => item.id === product.id)) {
//                 return prev;
//             }
//             return [...prev, product];
//         });
//     };
//     const clearFavorites = () => {
//   setFavorites([]);
// };
//     const removeFromFavorites = (productId) => {
//         setFavorites((prev) => prev.filter((item) => item.id !== productId));
//     };

//     const toggleFavorite = (product) => {
//         setFavorites((prev) => {
//             const exists = prev.find((item) => item.id === product.id);
//             if (exists) {
//                 return prev.filter((item) => item.id !== product.id);
//             }
//             return [...prev, product];
//         });
//     };

//     const isFavorite = (productId) => {
//         return favorites.some((item) => item.id === productId);
//     };

//     return (
//         <FavoritesContext.Provider
//             value={{
//                 favorites,
//                 addToFavorites,
//                 removeFromFavorites,
//                 toggleFavorite,
//                 isFavorite,
//                 clearFavorites
//             }}
//         >
//             {children}
//         </FavoritesContext.Provider>
//     );
// };

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("g-crown-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("g-crown-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch Wishlist Once From Backend
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const apiResponse = await axiosGetService("/customer/wishlist/allitem");

      if (apiResponse.ok) {
        const list = apiResponse.data.data[0]?.products || [];

        const formatted = list.map(p => ({
          ...p,
          _id: p._id || p.id   // normalize backend products
        }));

        setFavorites(formatted);
        localStorage.setItem("g-crown-favorites", JSON.stringify(formatted));
      }
    } catch (err) {
      console.log("Wishlist load error:", err);
    }
  };

  const toggleFavorite = async (product) => {
    const productId = product._id || product.id;

    const exists = favorites.some(item => item._id === productId);

    if (!exists) {
      // Optimistic Add
      setFavorites(prev => [...prev, { ...product, _id: productId }]);

      const response = await axiosPostService("/customer/wishlist/add", {
        productId
      });

      if (!response.ok) {
        setFavorites(prev => prev.filter(item => item._id !== productId));
        alert(response.data.message || "Failed to add to wishlist");
      }
    } else {
      // Optimistic Remove
      setFavorites(prev => prev.filter(item => item._id !== productId));

      const response = await axiosPutService("/customer/wishlist/remove", {
        productId
      });

      if (!response.ok) {
        alert(response.data.message || "Failed to remove item");
        setFavorites(prev => [...prev, product]);
      }
    }
  };

  const removeFromFavorites = async (productId) => {
    setFavorites(prev => prev.filter(item => item._id !== productId));

    const response = await axiosPutService("/customer/wishlist/remove", {
      productId
    });

    if (!response.ok) {
      alert(response.data.message || "Failed to remove item");
    }
  };

  const clearFavorites = async () => {
    setFavorites([]);

    const response = await axiosPutService("/customer/wishlist/removeall");

    if (!response.ok) {
      console.log("Failed to clear wishlist");
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item._id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        removeFromFavorites,
        fetchWishlist,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

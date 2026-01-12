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

  // Sync LocalStorage with favorites
  useEffect(() => {
    localStorage.setItem("g-crown-favorites", JSON.stringify(favorites));
  }, [favorites]);


  //Get All Item
  useEffect(() => {
    (async () => {
      try {
        const apiResponse = await axiosGetService("/customer/wishlist/allitem");

        if (apiResponse.ok) {
          const list = apiResponse.data.data[0].products;


          // ensure product.id exists 
          const formatted = list.map(p => ({
            ...p,
            id: p._id ?? p.id,  // normalized
          }));
          setFavorites(formatted);
          localStorage.setItem("g-crown-favorites", JSON.stringify(formatted));
        }
      } catch (err) {
        console.log("Load Wishlist Error:", err);
      }
    })();
  }, []);


  // 🌟 Toggle Favorite (Add / Remove) — UI + Backend
  const toggleFavorite = async (product) => {
    const exists = favorites.some((item) => item.id === product.id);

    if (!exists) {
      // optimistic UI update
      setFavorites((prev) => [...prev, product]);

      const apiResponse = await axiosPostService("/customer/wishlist/add", {
        // productId: product._id,
        productId: "6962bd30609758b34b282294"
      });

      if (!apiResponse.ok) {
        // revert UI if failed
        setFavorites((prev) => prev.filter((item) => item.id !== product.id));
        alert(apiResponse.data.message || "Failed to add in wishlist");
      }
    } else {
      // optimistic remove UI
      setFavorites((prev) => prev.filter((item) => item.id !== product.id));

      const apiResponse = await axiosPutService("/customer/wishlist/remove", {
        // productId: product.id,
        productId: "6962b7d6f7c0bca69ae3dfd2"
      });

      if (!apiResponse.ok) {
        // rollback UI if delete failed
        setFavorites((prev) => [...prev, product]);
        alert(apiResponse.data.message || "Failed to remove from wishlist");
      }
    }
  };


  // 🧹 Remove Single Item (UI + Backend)
  const removeFromFavorites = async (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));

    const apiResponse = await axiosPutService("/customer/wishlist/remove", {
      productId,
    });

    if (!apiResponse.ok) {
      alert(apiResponse.data.message || "Failed to remove item");
    }
  };


  // 🗑 Clear All Wishlist (UI + Backend)
  const clearFavorites = async () => {
    setFavorites([]);

    const apiResponse = await axiosPutService("/customer/wishlist/removeall");

    if (!apiResponse.ok) {
      console.log("Failed to clear wishlist from backend");
    }
  };


  // ❤️ Check If Favorite
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };


  const fetchWishlist = async () => {
  try {
    const apiResponse = await axiosGetService("/customer/wishlist/allitem");

    if (apiResponse.ok) {
      const list = apiResponse.data.data[0].products;

      const formatted = list.map(p => ({
        ...p,
        id: p._id ?? p.id
      }));

      setFavorites(formatted);
      localStorage.setItem("g-crown-favorites", JSON.stringify(formatted));
    }
  } catch (err) {
    console.log("Wishlist load error:", err);
  }
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

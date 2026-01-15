import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("g-crown-cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("g-crown-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // const addToCart = (product, quantity = 1) => {
    //     setCartItems((prev) => {
    //         const existing = prev.find((item) => item.id === product.id);
    //         if (existing) {
    //             return prev.map((item) =>
    //                 item.id === product.id
    //                     ? { ...item, quantity: item.quantity + quantity }
    //                     : item
    //             );
    //         }
    //         return [...prev, { ...product, quantity }];
    //     });
    // };
const addToCart = (product, quantity = 1) => {
  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);

    // 👉 Backend schema नुसार correct price
    const cleanPrice = Number(
      product.price?.sale || product.price?.mrp || 0
    );

    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity, price: cleanPrice }
          : item
      );
    }

    return [...prev, { ...product, price: cleanPrice, quantity }];
  });
};



    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
        const price = Number(item.price?.price || item.price?.amount || item.price || 0);
        const qty = Number(item.quantity) || 1;
        return total + price * qty;
    }, 0);
};



    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

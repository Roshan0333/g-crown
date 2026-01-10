import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorited = isFavorite(product.id);

  const cartItem = useMemo(
    () => cartItems.find((item) => item.id === product.id),
    [cartItems, product.id]
  );

  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity === 1) removeFromCart(product.id);
    else updateQuantity(product.id, quantity - 1);
  };

  return (
    <div
      onClick={() =>
        navigate(`/product/${product.id}`, { state: { product } })
      }
      className="
        group relative cursor-pointer
        rounded-xl bg-[#fff9e9]
        shadow-xl hover:shadow-3xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* Badge */}
      {product.bestseller && (
        <span className="absolute top-3 left-3 z-10 bg-[#CBA135] text-white text-[10px] px-2 py-1 tracking-widest rounded">
          BESTSELLER
        </span>
      )}

      {/* Favorite */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
        }}
        className="
          absolute top-3 right-3 z-10
          bg-white/90 backdrop-blur
          p-2 rounded-full
          shadow hover:scale-110 transition
        "
        aria-label="Toggle favorite"
      >
        <Heart
          size={16}
          className={
            favorited
              ? "fill-red-500 text-red-500"
              : "text-[#08221B]"
          }
        />
      </button>

      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="text-[#CBA135] text-xs">
          ★★★★★{" "}
          <span className="text-[#08221B] text-[11px]">
            ({product.reviews})
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-[15px] text-[#08221B] leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Meta */}
        <p className="text-[11px] text-[#37654B]">
          {product.material} · {product.color}
        </p>

        {/* Price */}
        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-lg font-bold text-[#08221B]">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-xs text-[#37654B] line-through">
              ₹{product.oldPrice.toLocaleString()}
            </p>
          </div>

          <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded font-semibold">
            SAVE 10%
          </span>
        </div>

        {/* Cart Controls */}
        <div onClick={(e) => e.stopPropagation()} className="pt-3">
          {quantity > 0 ? (
            <div className="flex items-center justify-between rounded-lg border border-[#08221B]/20 bg-[#FFF9E9]">
              <button
                onClick={handleDecrease}
                className="h-10 w-10 flex items-center justify-center hover:bg-[#08221B] hover:text-white transition rounded-l-lg"
              >
                <Minus size={14} />
              </button>

              <span className="text-sm font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="h-10 w-10 flex items-center justify-center hover:bg-[#08221B] hover:text-white transition rounded-r-lg"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="
                w-full h-10
                bg-[#08221B] text-white
                text-xs tracking-widest uppercase
                rounded-lg
                hover:bg-black
                transition active:scale-95
              "
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
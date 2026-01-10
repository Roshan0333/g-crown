import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </CartProvider>
  );
}
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AdminProvider } from "./context/AdminContext.jsx";

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AdminProvider>
          <AppRoutes />
        </AdminProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

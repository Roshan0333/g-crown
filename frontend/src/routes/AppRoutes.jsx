import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";


import Home from "../pages/homePage/Home";
import SignIn from "../pages/auth/SignIn.jsx";
import SignUp from "../pages/auth/SignUp.jsx";


import Collections from "../pages/collections/Collections.jsx";
import EngagementRings from "../pages/collections/EngagementRings.jsx";
import WeddingBands from "../pages/collections/WeddingBands.jsx";
import ClassicSolitaire from "../pages/collections/ClassicSolitaire.jsx";
import VintageBands from "../pages/collections/VintageBands.jsx";
import NewArrivals from "../pages/newArrivals/NewArrival.jsx";
import Occasions from "../pages/occasions/Occasion.jsx";
import Store from "../pages/store/Store.jsx";
import AboutUs from "../pages/aboutUs/AboutUs.jsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx";
import Profile from "./../pages/Profile/Profile.jsx"



import TrackingOrder from '../pages/trackOrder/TrackOrder.jsx'
import TrackingForm from '../pages/trackOrder/TrackingForm.jsx'
import Cart from '../pages/cart/Cart.jsx'
import Favorites from '../pages/favorites/Favorites.jsx'
import OrderSuccess from '../pages/orders/OrderSuccess.jsx'
import OrderCancel from '../pages/orders/OrderCancel.jsx'

import Checkout from "../pages/checkout/Checkout.jsx";
import AdminDashboard from "../pages/admin/admin.jsx";
import ContactUs from "../pages/contactus/ContactUs.jsx";
import PrivacyPolicy from "../pages/legal/Privacy.jsx";
import Terms from "../pages/terms/Terms.jsx";
import Faq from "../pages/faqs/Faqs.jsx";
import Verify from "../pages/auth/Verify.jsx";
import ComingSoon from "../pages/auth/ComingSoon.jsx";
import AdminLogin from "../pages/auth/AdminLogin.jsx";
import AdminSignUp from "../pages/auth/AdminSignup.jsx";






export default function AppRoutes() {
  const location = useLocation();

  // navbar + footer hide only on auth pages
  const hideLayout =
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  return (
    <div className={!hideLayout ? "pt-16 sm:pt-20 md:pt-22 lg:pt-28 xl:pt-32" : ""}>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />

        
        

        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/engagement-rings" element={<EngagementRings />} />
        <Route path="/collections/wedding-bands" element={<WeddingBands />} />
        <Route path="/collections/classic-solitaire" element={<ClassicSolitaire />} />
        <Route path="/collections/vintage-bands" element={<VintageBands />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/occasions" element={<Occasions />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faqs" element={<Faq />} />

        <Route path="/track-order" element={<TrackingForm />} />
        <Route path="/track-id" element={<TrackingOrder />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favourites" element={<Favorites />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-cancel" element={<OrderCancel />} />
    
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

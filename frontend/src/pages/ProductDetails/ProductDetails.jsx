import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight, Minus, Plus, Share2, ArrowLeft, Heart, User, ChevronDown, Upload, Check } from "lucide-react";
import ProductCard from "../../components/products/ProductCard";
import { allProducts } from "../../assets/MockData.jsx";
import FeatureCard from "../../components/common/FeatureCard";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

import shippingIcon from "../../assets/NewArrivalAssets/logos/la_shipping-fast.png";
import paymentIcon from "../../assets/NewArrivalAssets/logos/fluent_payment-32-regular.png";
import supportIcon from "../../assets/NewArrivalAssets/logos/streamline-plump_customer-support-7.png";


const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedPurity, setSelectedPurity] = useState("18 KT");
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const favorited = product ? isFavorite(product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowAddedToCart(true);
      setTimeout(() => setShowAddedToCart(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  if (!product) {
    return (
      <div className="text-center py-20 bg-[#FFF9E9] min-h-screen">
        <h2 className="text-2xl font-serif text-[#1C3A2C]">Product not found!</h2>
        <button onClick={() => navigate(-1)} className="mt-4 underline text-[#B39055]">Go back</button>
      </div>
    );
  }

  const tabs = ["Description", "Additional Information", "Review"];

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3); // sirf 3 product show karne ke liye


  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  // UI Components for the Review Section
  const RatingBar = ({ stars, percentage }) => (
    <div className="flex items-center gap-4 text-xs font-bold text-[#1C3A2C]">
      <span className="w-10 whitespace-nowrap">{stars} Star</span>
      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-gray-100">
        <div className="h-full bg-[#CBA135]" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFF9E9] min-h-screen font-sans text-[#1C3A2C]">
      <nav className="max-w-[1440px] mx-auto px-2 sm:px-12 py-2 flex items-center justify-between">
        <div className="text-xs sm:text-sm text-gray-500">
          Home / Collection / <span className="text-[#B39055]">{product.name}</span>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold hover:text-[#B39055] transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
      </nav>

      <main className="max-w-[1440px] mx-auto px-2 sm:px-12 py-0">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[40%] space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={() => product && toggleFavorite(product)}
                className="absolute top-4 right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  size={20}
                  className={favorited ? "fill-red-500 text-red-500" : "text-[#08221B]"}
                />
              </button>
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 p-2 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={24} />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 p-2 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-md overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#B39055]">
                  <img src={product.image} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6 mt-15 ">
            <div>
              <p className="text-[#1C3A2C] font-serif text-lg mb-[-10px]">{product.category}</p>
              <div className="flex justify-between items-start">
                <h1 className="text-[42px] font-medium sm:text-4xl font-serif text-[#1C3A2C] leading-tight">{product.name}</h1>
                <span className="bg-[#a4dfc5] text-[#1C3A2C] px-4 py-2 text-xs rounded border-2 border-[#74B397] mt-5">In Stock</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#CBA135]">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[25px] font-bold text-[#1C3A2C]">₹{product.price.toLocaleString()}</span>
              <span className=" line-through text-lg text-[#37654B]">₹{product.oldPrice.toLocaleString()}</span>
            </div>

            <p className="text-gray-600 leading-relaxed">
              The {product.name} is a refined gold creation designed to add effortless luxury and timeless charm to every moment.
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-sm uppercase tracking-wider">Purity</p>
              <div className="flex gap-3">
                {["18 KT", "22 KT", "24 KT"].map((purity) => (
                  <button
                    key={purity}
                    onClick={() => setSelectedPurity(purity)}
                    className={`px-4 py-2 border text-sm transition-all ${selectedPurity === purity
                      ? "border-[#1C3A2C] bg-[#1C3A2C] text-white"
                      : "border-gray-300 hover:border-[#1C3A2C]"
                      }`}
                  >
                    {purity}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center border border-gray-300 rounded bg-white">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100 transition-colors"><Minus size={16} /></button>
                <span className="px-6 font-bold min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-gray-100 transition-colors"><Plus size={16} /></button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#195C4A] text-white py-4 px-8 uppercase tracking-widest font-bold hover:bg-black transition-all relative"
              >
                {showAddedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={18} /> Added!
                  </span>
                ) : (
                  "Add To Cart"
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 border-2 border-[#1C3A2C] text-[#1C3A2C] py-4 px-8 uppercase tracking-widest font-bold hover:bg-[#195C4A] hover:text-white transition-all"
              >
                Buy Now
              </button>
            </div>

            <div className="pt-6 border-t-2 border-[#6E6E6E] text-sm space-y-2 text-gray-500 mt-10">
              <p><span className="text-[#1C3A2C] font-semibold">SKU :</span> GLDJ8SADC23C</p>
              <p><span className="text-[#1C3A2C] font-semibold">Tags :</span> Gold, {product.category}, Diamond</p>
              <div className="flex items-center gap-2">
                <span className="text-[#1C3A2C] font-semibold">Share :</span>
                <Share2
                  size={16}
                  className="cursor-pointer hover:text-[#B39055] transition-colors"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out ${product.name} at G-Crown Jewellers`,
                        url: window.location.href,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Success Notification */}
        {showAddedToCart && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideIn">
            <Check size={20} />
            <span>Added to cart successfully!</span>
          </div>
        )}

        {/* --- TABS SECTION: UPDATED ACCORDING TO YOUR IMAGES --- */}
        <div className="mt-20">
          <div className="flex justify-center border-b border-gray-200 gap-8 sm:gap-16">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-serif transition-all relative ${activeTab === tab ? "text-[#1C3A2C]" : "text-gray-400"
                  }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1C3A2C]" />}
              </button>
            ))}
          </div>

          <div className="py-10 max-w-5xl mx-auto">
            {/* Description Tab */}
            {activeTab === "Description" && (
              <div className="text-gray-600 leading-loose text-lg font-serif text-center space-y-6">
                <p>
                  The Golden Elegance Bracelet is a timeless expression of refined luxury and graceful design. Crafted in radiant gold with a flawless finish, this bracelet reflects understated sophistication that complements both everyday wear and special occasions. Its sleek form and elegant detailing make it a versatile piece, designed to be worn effortlessly and admired endlessly.
                </p>
                <p>
                  Created with precision and care, the Golden Elegance Bracelet embodies G-Crown's commitment to craftsmanship, quality, and lasting beauty—an heirloom-worthy piece meant to shine for generations.
                </p>
              </div>
            )}

            {/* Additional Information Tab: Table Design */}
            {activeTab === "Additional Information" && (
              <div className="max-w-4xl mx-auto border border-gray-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1C3A2C] text-white">
                      <th className="py-4 px-6 font-serif font-normal">Feature</th>
                      <th className="py-4 px-6 font-serif font-normal">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-bold border-r border-gray-50">Material</td>
                      <td className="py-4 px-6 text-gray-600">Gold</td>
                    </tr>
                    <tr className="bg-[#F9F4E8]">
                      <td className="py-4 px-6 font-bold border-r border-gray-50">Gemstones</td>
                      <td className="py-4 px-6 text-gray-600">Diamond</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-bold border-r border-gray-50">Purity</td>
                      <td className="p-4 px-6 text-gray-600">18 KT, 22 KT, 24 KT</td>
                    </tr>
                    <tr className="bg-[#F9F4E8]">
                      <td className="py-4 px-6 font-bold border-r border-gray-50">Weight</td>
                      <td className="py-4 px-6 text-gray-600">30 grams</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="py-4 px-6 font-bold border-r border-gray-50">Brand</td>
                      <td className="py-4 px-6 text-gray-600">ABC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Review Tab: Full Image Match Design */}
            {activeTab === "Review" && (
              <div className="space-y-12">
                {/* Rating Header */}
                <div className="flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 pb-10">
                  <div className="text-center md:text-left md:border-r border-gray-200 pr-12">
                    <div className="text-5xl font-bold text-[#1C3A2C]">4.9<span className="text-lg font-normal text-gray-400"> out of 5</span></div>
                    <div className="flex text-[#CBA135] my-2 justify-center md:justify-start">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-400 text-xs">(248 reviews)</p>
                  </div>
                  <div className="flex-1 space-y-2 w-full max-w-md">
                    <RatingBar stars={5} percentage={80} />
                    <RatingBar stars={4} percentage={65} />
                    <RatingBar stars={3} percentage={45} />
                    <RatingBar stars={2} percentage={25} />
                    <RatingBar stars={1} percentage={10} />
                  </div>
                </div>

                {/* Review List Section */}
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-serif text-[#1C3A2C]">Review List</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Showing 1-4 of 24 results</span>
                      <div className="flex items-center gap-1 border border-gray-200 rounded px-2 py-1 bg-[#F5EFE0] cursor-pointer">
                        <span>Sort by:</span>
                        <span className="font-bold">Newest</span>
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="space-y-10">
                    {/* Kristin Watson */}
                    <div className="border-b border-gray-100 pb-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=50" className="w-10 h-10 rounded-full object-cover" alt="user" />
                          <div>
                            <p className="font-bold text-sm">Kristin Watson</p>
                            <p className="text-[10px] text-gray-500">[ Verified ]</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">10 Days ago</span>
                      </div>
                      <div className="flex text-[#CBA135] mb-4 gap-1 items-center">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        <span className="text-xs font-bold text-[#1C3A2C] ml-1">5.0</span>
                      </div>
                      <div className="flex gap-4 mb-4">
                        <img src={product.image} className="w-24 h-24 object-cover rounded border border-gray-100" />
                        <img src={product.image} className="w-24 h-24 object-cover rounded border border-gray-100" />
                        <img src={product.image} className="w-24 h-24 object-cover rounded border border-gray-100" />
                      </div>
                    </div>

                    {/* Ananya Mehta */}
                    <div className="border-b border-gray-100 pb-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=50" className="w-10 h-10 rounded-full object-cover" alt="user" />
                          <div>
                            <p className="font-bold text-sm">Ananya Mehta</p>
                            <p className="text-[10px] text-gray-500">[ Verified ]</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">1 Month ago</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic mb-4">
                        The Golden Elegance Bracelet truly lives up to its name. The gold finish is radiant, the design is simple yet luxurious, and it feels very comfortable to wear throughout the day. It adds a subtle touch of sophistication to every outfit and looks even better in person.
                      </p>
                      <div className="flex text-[#CBA135] gap-1 items-center">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        <span className="text-xs font-bold text-[#1C3A2C] ml-1">5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Your Review Form */}
                <div className="pt-10">
                  <h3 className="text-xl font-serif text-[#1C3A2C] mb-1">Add your review</h3>
                  <p className="text-xs text-gray-500 mb-8">Let us know your thoughts.</p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold">Name*</label>
                        <input type="text" placeholder="Ex. John Kapoor" className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A2C]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold">Email*</label>
                        <input type="email" placeholder="example@gmail.com" className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A2C]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold">Your Rating*</label>
                      <div className="flex text-[#CBA135] gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="cursor-pointer" />)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold">Add Review Title*</label>
                      <input type="text" placeholder="Write Review Title here" className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A2C]" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold">Add Detailed Review*</label>
                      <textarea rows="4" placeholder="Write here" className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#1C3A2C] resize-none"></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold">Photo / Video (Optional)</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                        <p className="text-xs text-gray-400">Drag a Photo or Video</p>
                        <p className="text-xs font-bold text-[#1C3A2C] underline mt-1">Browse</p>
                      </div>
                    </div>

                    <button type="submit" className="bg-[#1C3A2C] text-white px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors rounded">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        <div className=" py-20 ">
          <p className="text-md tracking-widest text-[#CBA135] mb-2 text-center">
            RELATED PRODUCT
          </p>

          <h1 className="text-xl sm:text-3xl font-serif text-[#1C3A2C] mb-10 text-center">
            Explore Related Products
          </h1>

          <div className="flex justify-center gap-20 flex-wrap">
            {relatedProducts.map((item) => (
              <div key={item.id} className="w-80 border-2 border-[#FFF8E8] rounded-lg shadow-lg">
                <ProductCard product={item} className="w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* feature card usee */}

        <section className="bg-[#FFF9E9] px-4 sm:px-6 lg:px-12 xl:px-16 py-10 lg:py-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard icon={shippingIcon} title="Free Shipping" description="Free Shipping for Order above ₹ 2,000" />
            <FeatureCard icon={paymentIcon} title="Flexible Payment" description="Multiple Secure payment Options" />
            <FeatureCard icon={supportIcon} title="24x7 Support" description="We Support online all days" />
          </div>
        </section>


      </main>
    </div>
  );
};

export default ProductDetails;  
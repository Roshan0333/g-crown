import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown, X, ArrowRight, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "../../components/filterSection";

// Import images
import necklaceImg from "../../assets/NewArrivalAssets/elegant gold necklace with precious stones, luxury jewelry photography.png";
import ringsImg from "../../assets/NewArrivalAssets/luxury diamond rings collection on velvet display, elegant jewelry photography.png";
import earringsImg from "../../assets/NewArrivalAssets/luxury gold earrings with diamonds, elegant jewelry display photography.png";
import braceletsImg from "../../assets/NewArrivalAssets/luxury gold bracelets and bangles collection, elegant jewelry photography.png";
import shippingIcon from "../../assets/NewArrivalAssets/logos/la_shipping-fast.png";
import paymentIcon from "../../assets/NewArrivalAssets/logos/fluent_payment-32-regular.png";
import supportIcon from "../../assets/NewArrivalAssets/logos/streamline-plump_customer-support-7.png";
import bannerImage from "../../assets/NewArrivalAssets/Frame 7654506.png";

const NewArrival = () => {
  // --- Responsive State ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // State Management
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([2500, 345000]);
  const [sortBy, setSortBy] = useState("default");
  const [draggingHandle, setDraggingHandle] = useState(null);

  // Constants
  const MIN_PRICE = 2500;
  const MAX_PRICE = 345000;
  const PRICE_STEP = 1000;

  const categories = ["Bracelets", "Rings", "Necklaces", "Earrings"];
  const materials = ["Gold", "Platinum", "Rose Gold", "Diamond Jewelry", "Pearl"];
  const colors = ["Grey", "Green", "Orange", "Blue", "White"];

  // Products Data
  const products = useMemo(() => [
    { id: 1, image: necklaceImg, title: "Necklaces", description: "Statement pieces that captivate", badge: null, price: 45000 },
    { id: 2, image: necklaceImg, title: "Necklaces", description: "Statement pieces that captivate", badge: null, price: 38000 },
    { id: 3, image: ringsImg, title: "Rings", description: "From engagement to eternity", badge: "NEW", price: 125000 },
    { id: 4, image: earringsImg, title: "Earrings", description: "Elegance that frames your face", badge: "TRENDING", price: 28000 },
    { id: 5, image: braceletsImg, title: "Bracelets", description: "Adorn your wrists with grace", badge: null, price: 52000 },
    { id: 6, image: necklaceImg, title: "Necklaces", description: "Statement pieces that captivate", badge: null, price: 67000 },
    { id: 7, image: ringsImg, title: "Rings", description: "From engagement to eternity", badge: "NEW", price: 95000 },
    { id: 8, image: braceletsImg, title: "Bracelets", description: "Adorn your wrists with grace", badge: null, price: 43000 },
    { id: 9, image: necklaceImg, title: "Necklaces", description: "Statement pieces that captivate", badge: null, price: 58000 },
  ], []);

  // Handlers
  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
  }, []);

  const toggleMaterial = useCallback((material) => {
    setSelectedMaterials((prev) => prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]);
  }, []);

  const toggleColor = useCallback((color) => {
    setSelectedColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  }, [MIN_PRICE, MAX_PRICE]);

  const removeFilter = useCallback((type, value) => {
    switch (type) {
      case "price": setPriceRange([MIN_PRICE, MAX_PRICE]); break;
      case "material": setSelectedMaterials((prev) => prev.filter((m) => m !== value)); break;
      case "category": setSelectedCategories((prev) => prev.filter((c) => c !== value)); break;
      case "color": setSelectedColors((prev) => prev.filter((c) => c !== value)); break;
      default: break;
    }
  }, [MIN_PRICE, MAX_PRICE]);

  const handleMinPriceChange = useCallback((e) => {
    const newMin = Number(e.target.value);
    setPriceRange((currentRange) => newMin < currentRange[1] ? [newMin, currentRange[1]] : currentRange);
  }, []);

  const handleMaxPriceChange = useCallback((e) => {
    const newMax = Number(e.target.value);
    setPriceRange((currentRange) => newMax > currentRange[0] ? [currentRange[0], newMax] : currentRange);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE || selectedMaterials.length > 0 || selectedCategories.length > 0 || selectedColors.length > 0;
  }, [priceRange, selectedMaterials, selectedCategories, selectedColors, MIN_PRICE, MAX_PRICE]);

  const isPriceFiltered = priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategories.length > 0) filtered = filtered.filter((p) => selectedCategories.includes(p.title));
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case "price-low-high": filtered.sort((a, b) => a.price - b.price); break;
      case "price-high-low": filtered.sort((a, b) => b.price - a.price); break;
      case "newest": filtered.sort((a, b) => b.id - a.id); break;
      default: break;
    }
    return filtered;
  }, [products, selectedCategories, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFF9EA]">
      {/* Hero Banner Section */}
      <section className="w-full relative overflow-hidden">
        <div className="w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
          <img src={bannerImage} alt="New Arrivals" className="w-full h-full object-cover" loading="eager" />
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-[#FFF9EA] shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 lg:py-12">
          
          {/* Page Header */}
          <header className="mb-6 lg:mb-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold font-cormorant text-[#CBA135] leading-tight uppercase">NEW ARRIVALS</h1>
              <span className="text-[24px] sm:text-[32px] lg:text-[40px] font-semibold font-cormorant text-[#1C3A2C]">|</span>
              <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-normal font-montserrat text-[#1C3A2C]">{filteredProducts.length} Designs</span>
            </div>
          </header>

          {/* Filter Controls Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full lg:w-auto">
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold font-cormorant text-[#1C3A2C]">Filter Options</h2>
                {/* Mobile Toggle Button */}
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1C3A2C] text-white rounded-md font-montserrat text-[13px] shadow-md active:scale-95 transition-all"
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>
              </div>
              <p className="hidden sm:block text-[14px] lg:text-[18px] font-normal font-cormorant text-[#1C3A2C]">
                Showing {filteredProducts.length > 0 ? '1' : '0'}-{Math.min(12, filteredProducts.length)} of {filteredProducts.length} results
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-[14px] lg:text-[18px] font-normal font-cormorant text-[#1C3A2C] whitespace-nowrap">Sort by:</label>
              <div className="relative flex-1 sm:flex-initial">
                <select 
                  id="sort-select"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-[200px] lg:w-[240px] h-[40px] lg:h-[48px] bg-[#EFDFB7] border border-[#1C3A2C] rounded px-3 text-[14px] lg:text-[15px] font-cormorant text-[#1C3A2C] appearance-none cursor-pointer"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1C3A2C] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-8 p-3 rounded-lg">
              <span className="text-[16px] sm:text-[20px] font-medium font-cormorant text-[#1C3A2C]">Active Filters:</span>
              {isPriceFiltered && <FilterBadge label={`₹${priceRange[0].toLocaleString()} - ₹${priceRange[1].toLocaleString()}`} onRemove={() => removeFilter("price")} />}
              {selectedMaterials.map((m) => <FilterBadge key={m} label={m} onRemove={() => removeFilter("material", m)} />)}
              {selectedCategories.map((c) => <FilterBadge key={c} label={c} onRemove={() => removeFilter("category", c)} />)}
              {selectedColors.map((col) => <FilterBadge key={col} label={col} onRemove={() => removeFilter("color", col)} />)}
              <button onClick={clearAllFilters} className="text-[12px] font-medium font-montserrat text-[#1C3A2C] hover:text-[#CBA135] underline underline-offset-2">Clear All</button>
            </div>
          )}

          {/* Main Grid Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            <FilterSidebar
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              materials={materials}
              selectedMaterials={selectedMaterials}
              onToggleMaterial={toggleMaterial}
              colors={colors}
              selectedColors={selectedColors}
              onToggleColor={toggleColor}
              priceRange={priceRange}
              onPriceChange={{ onMinChange: handleMinPriceChange, onMaxChange: handleMaxPriceChange }}
              minPrice={MIN_PRICE}
              maxPrice={MAX_PRICE}
              priceStep={PRICE_STEP}
              draggingHandle={draggingHandle}
              setDraggingHandle={setDraggingHandle}
            />

            <section className="flex-1 min-w-0">
              {filteredProducts.length > 0 ? (
                /* Grid: 2 columns on mobile, 3 columns on large desktop */
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <EmptyState onClearFilters={clearAllFilters} />
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-[#FFF9EA] px-4 sm:px-6 lg:px-12 xl:px-16 py-10 lg:py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <FeatureCard icon={shippingIcon} title="Free Shipping" description="Free Shipping for Order above ₹2,000" />
          <FeatureCard icon={paymentIcon} title="Flexible Payment" description="Multiple Secure payment Options" />
          <FeatureCard icon={supportIcon} title="24x7 Support" description="We Support online all days" />
        </div>
      </section>
    </div>
  );
};

/* --- STYLE COMPONENTS --- */

const FilterBadge = ({ label, onRemove }) => (
  <div className="inline-flex items-center gap-1.5 bg-[#195C4A] rounded-md px-2 py-1 sm:px-3 sm:py-2">
    <span className="text-[11px] sm:text-[13px] font-semibold font-montserrat text-white uppercase tracking-wide">{label}</span>
    <button onClick={onRemove} className="text-white hover:text-[#CBA135] transition-colors">
      <X className="w-3 h-3 sm:w-4 sm:h-4" />
    </button>
  </div>
);

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <article
      className="relative w-full aspect-[3/4] bg-[#EFDFB7] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,58,44,0.95)] via-[rgba(28,58,44,0.2)] to-transparent transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0.85 }} />
      
      {product.badge && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#CBA135] px-2 py-1 sm:px-3 sm:py-1.5 rounded-md z-10 shadow-lg">
          <span className="text-[9px] sm:text-[11px] font-bold font-montserrat text-white uppercase tracking-wider">{product.badge}</span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
        <h3 className="text-[18px] sm:text-[28px] lg:text-[32px] font-bold font-cormorant text-white mb-0.5 sm:mb-1 leading-tight">{product.title}</h3>
        
        {/* Hide description on mobile to keep card proportional */}
        <p className="hidden sm:block text-[13px] font-normal font-montserrat text-[rgba(239,223,183,0.95)] mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
          <button className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[13px] font-semibold font-montserrat text-[#CBA135] uppercase tracking-wider group-hover:gap-3 transition-all">
            SHOP NOW <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <span className="text-[12px] sm:text-[16px] font-semibold font-montserrat text-white">₹{product.price.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
};

const EmptyState = ({ onClearFilters }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center max-w-md mx-auto">
    <h3 className="text-[22px] sm:text-[28px] font-semibold font-cormorant text-[#1C3A2C] mb-2">No products found</h3>
    <p className="text-[13px] sm:text-[15px] font-normal font-montserrat text-[#1C3A2C]/70 mb-6">Try adjusting your filters to find what you're looking for</p>
    <button onClick={onClearFilters} className="px-6 py-2.5 bg-[#CBA135] text-white text-[14px] font-medium font-montserrat rounded-lg hover:bg-[#B8903A] transition-colors shadow-md">Clear All Filters</button>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 sm:gap-5 bg-white rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 shadow-sm hover:shadow-md transition-all">
    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#1C3A2C] shrink-0 shadow-sm">
      <img src={icon} alt="" className="w-5 h-5 sm:w-8 sm:h-8" loading="lazy" />
    </div>
    <div className="flex flex-col">
      <h4 className="text-[16px] sm:text-[18px] font-bold font-cormorant text-[#1C3A2C] leading-tight">{title}</h4>
      <p className="text-[12px] sm:text-[14px] font-normal font-montserrat text-[#1C3A2C]/80 leading-snug">{description}</p>
    </div>
  </div>
);

export default NewArrival;
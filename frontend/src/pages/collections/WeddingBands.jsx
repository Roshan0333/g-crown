import React, { useMemo } from "react";
import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";

const WeddingBands = () => {
  // Filter for Wedding Bands: Simple bands, promise rings, or bands in name
  const weddingBands = useMemo(() => {
    return allProducts.filter((product) => {
      if (product.category !== "Rings") return false;
      
      const name = product.name.toLowerCase();
      
      // Wedding bands typically:
      // - Have "Band" in the name
      // - Are simpler designs (Promise, Infinity, Knot)
      // - Can be any metal type
      return (
        name.includes("band") ||
        name.includes("promise") ||
        name.includes("infinity") ||
        name.includes("knot") ||
        name.includes("blush") // Simple band styles
      );
    });
  }, []);

  return (
    <CollectionPage
      title="Wedding Bands"
      products={weddingBands}
    />
  );
};

export default WeddingBands;

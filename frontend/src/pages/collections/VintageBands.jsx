import React, { useMemo } from "react";
import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";

const VintageBands = () => {
  // Filter for Vintage Bands: Antique, heritage, classic, vintage styles
  const vintageBands = useMemo(() => {
    return allProducts.filter((product) => {
      if (product.category !== "Rings") return false;
      
      const name = product.name.toLowerCase();
      
      // Vintage bands typically have:
      // - Vintage, Antique, Heritage, Classic in name
      // - Traditional or timeless designs
      return (
        name.includes("vintage") ||
        name.includes("antique") ||
        name.includes("heritage") ||
        name.includes("classic") ||
        name.includes("traditional") ||
        name.includes("elegant") ||
        name.includes("infinity") ||
        name.includes("royal") ||
        name.includes("mahal") ||
        name.includes("temple")
      );
    });
  }, []);

  return (
    <CollectionPage
      title="Vintage Bands"
      products={vintageBands}
    />
  );
};

export default VintageBands;

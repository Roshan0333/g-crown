import React, { useMemo } from "react";
import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";

const EngagementRings = () => {
  // Filter for Engagement Rings: Diamond rings, solitaire, halo, or engagement-style rings
  const engagementRings = useMemo(() => {
    return allProducts.filter((product) => {
      if (product.category !== "Rings") return false;
      
      const name = product.name.toLowerCase();
      const material = product.material?.toLowerCase() || "";
      
      // Engagement rings typically have:
      // - Diamond in material or name
      // - Solitaire, Halo, Royal, Crown in name
      // - Higher price point (engagement rings are usually premium)
      return (
        material.includes("diamond") ||
        name.includes("solitaire") ||
        name.includes("halo") ||
        name.includes("royal") ||
        name.includes("crown") ||
        name.includes("emerald") ||
        name.includes("sapphire") ||
        (product.material === "Diamond Jewelry" || product.material === "Platinum" || product.material === "White Gold")
      );
    });
  }, []);

  return (
    <CollectionPage
      title="Engagement Rings"
      products={engagementRings}
    />
  );
};

export default EngagementRings;

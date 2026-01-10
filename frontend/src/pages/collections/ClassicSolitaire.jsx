import React, { useMemo } from "react";
import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";

const ClassicSolitaire = () => {
  // Filter for Classic Solitaire: Single stone rings, solitaire style
  const classicSolitaire = useMemo(() => {
    return allProducts.filter((product) => {
      if (product.category !== "Rings") return false;
      
      const name = product.name.toLowerCase();
      const material = product.material?.toLowerCase() || "";
      
      // Classic Solitaire rings:
      // - Have "Solitaire" in name
      // - Diamond material
      // - Single prominent stone designs (Royal, Crown, Statement)
      return (
        name.includes("solitaire") ||
        (material.includes("diamond") && (
          name.includes("royal") ||
          name.includes("crown") ||
          name.includes("statement") ||
          name.includes("aura")
        ))
      );
    });
  }, []);

  return (
    <CollectionPage
      title="Classic Solitaire"
      products={classicSolitaire}
    />
  );
};

export default ClassicSolitaire;

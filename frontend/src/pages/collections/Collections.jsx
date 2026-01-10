import React from "react";
import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";

const Collections = () => {
  return <CollectionPage title="Collections" products={allProducts} />;
};

export default Collections;
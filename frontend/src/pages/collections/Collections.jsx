import React from "react";
// import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";
import { axiosGetService } from "../../services/axios";
import { useState } from "react";
import { useEffect } from "react";

const Collections = () => {

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    ;(async () => {
      const apiResponse = await axiosGetService("/customer/product/all");

      if (!apiResponse.ok) {
        console.log(apiResponse.data.message || "Failed to load products")
        return;
      }

      const productsArray = apiResponse.data.data;

      if (Array.isArray(productsArray)) {
        setAllProducts(productsArray);
      } else {
        setAllProducts([]);
      }
    })();
  }, []);


  return <CollectionPage title="Collections" products={allProducts} />;
};

export default Collections;
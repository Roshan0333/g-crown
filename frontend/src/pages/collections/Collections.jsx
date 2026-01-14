import React from "react";
// import { allProducts } from "../../assets/MockData";
import CollectionPage from "../../components/collections/CollectionPage";
import { axiosGetService } from "../../services/axios";
import { useState } from "react";
import { useEffect } from "react";

const Collections = () => {

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axiosGetService("/customer/product/all");

      if (!res.ok) {
        alert(res.data.message || "Failed to load products");
        return;
      }

      // backend format: res.data.data = Array(products)
      const productsArray = res.data.data;

      if (Array.isArray(productsArray)) {
        setAllProducts(productsArray);
        console.log(productsArray)
      } else {
        console.warn("Unexpected backend format:", productsArray);
        setAllProducts([]);
      }
    })();
  }, []);


  return <CollectionPage title="Collections" products={allProducts} />;
};

export default Collections;
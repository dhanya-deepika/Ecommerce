// import React from 'react'
// import { useSelector } from 'react-redux'
// import ProductCard from '../components/ProductCard'

// const Shop = () => {
//     const products = useSelector((state: any) => state.product)
//    return (
//     <div className="mx-auto py-12 px-4 md:px-16 lg:px-24">
//         <h2 className="text-2xl font-bold mb-6 text-center">Shop</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"/>
//         {products.map((product: any) => (
//             <ProductCard product={product}/>
//         ))}
//     </div>
//    ) 
// }

// export default Shop 


import { useState, useEffect } from "react";
import { mockData as mockProducts } from "../mockData";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // toggle this flag to switch between API and mock
    const useMockData = true;

    if (useMockData) {
      setProducts(mockProducts as any[]);
    } else {
      // Your actual API call
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

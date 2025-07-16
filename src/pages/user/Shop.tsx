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
import ProductCard from "../../components/user/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // ✅ Fetch from fakestoreapi instead of mock
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price,
          description: item.description,
        }));

        setProducts(formatted);
        localStorage.setItem("products", JSON.stringify(formatted));
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;

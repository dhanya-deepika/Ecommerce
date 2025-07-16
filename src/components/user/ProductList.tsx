import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  name: string;
  image: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();

        // Transform API structure to fit your ProductCard
        const formatted = data.map((item: any) => ({
          name: item.title,
          image: item.image,
          price: item.price,
        }));

        setProducts(formatted);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

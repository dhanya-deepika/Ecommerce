import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { RootState } from "../redux/store";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. Get products from Redux
  const reduxProducts = useSelector((state: RootState) => state.products.products);

  const products =
    reduxProducts.length > 0
      ? reduxProducts
      : JSON.parse(localStorage.getItem("products") || "[]");
  

  // 3. Match product by slug name
  const product = products.find(
    (item: { name: string }) =>
      item.name.toLowerCase().replace(/\s+/g, "-") === id
  );

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          totalPrice: product.price,
        })
      );
      alert("Product added to cart!");
    }
  };

  if (!product) {
    return (
      <div className="p-10 text-center text-lg text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="mt-16  max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-contain rounded"
      />
      <div>
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-600 mb-4">
          {product.description || "No description available."}
        </p>
        <p className="text-xl font-semibold mb-4">₹{product.price}</p>
        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

import React from 'react';
import { FaStar } from 'react-icons/fa';
import AddToCartButton from '../components/AddToCartButton';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface Product {
  name: string;
  image: string;
  title: string;
  price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const productId = product.name.replace(/\s+/g, '-').toLowerCase();
  const slug = product.name.toLowerCase().replace(/\s+/g, '-');

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation on button click
    dispatch(
      addToCart({
        id: productId,
        ...product,
        quantity: 1,
        totalPrice: product.price,
      })
    );
    alert('Product Added Successfully');
  };

  return (
    <Link to={`/product/${slug}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 overflow-hidden">
        {/* Product Image */}
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Product Name */}
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>

          {/* Stars */}
          <div className="flex items-center text-yellow-500">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} size={14} />
            ))}
          </div>

          {/* Price and Button */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-red-600 font-bold text-lg">₹{product.price}</span>
            <button
              onClick={handleAddToCart}
              className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

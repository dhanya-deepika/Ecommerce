// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import EmptyCart from "../assets/Images/emptycart.png";
// import { FaTrashAlt } from "react-icons/fa";
// import ChangeAddress from "../components/ChangeAddress";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "../redux/cartSlice";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface CartState {
//   products: Product[];
//   totalPrice: number;
// }


// const Cart = () => {
//   const cart = useSelector((state: { cart: CartState }) => state.cart);
//   const [address, setAddress] = useState("Main Street, 0012");
//   const navigate = useNavigate();
//   const [isModelOpen, setIsModelOpen] = useState(false);
//   const dispatch = useDispatch();
  

//   const totalPrice = useSelector((state: { cart: CartState }) => state.cart.totalPrice);
//   return (
//     <div className="min-h-screen p-4 md:p-10 flex flex-col">
//       {cart.products.length > 0 ? (
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

//           {/* Cart Header */}
//           <div className="hidden md:grid grid-cols-5 gap-4 font-semibold border-b pb-2 mb-4">
//             <p className="col-span-2">Product</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Subtotal</p>
//           </div>

//           {/* Cart Items */}
//           {cart.products.map((product: Product) => (
//             <div
//               key={product.id}
//               className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center py-4 border-b"
//             >
//               {/* Clickable Product Info */}
//               <div
//             onClick={() => navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`)}
//             className="col-span-2 flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-16 h-16 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="font-medium text-blue-700 hover:underline">
//                     {product.name}
//                   </h3>
//                 </div>
//               </div>

//               {/* Price */}
//               <p className="text-sm">${product.price.toFixed(2)}</p>

//               {/* Quantity */}
//               <div className="flex items-center space-x-2">
//                 <button
//                   className="px-2 border rounded"
//                   onClick={() => dispatch(decreaseQuantity({ id: String(product.id) }))}
//                 >
//                   -
//                 </button>
//                 <p>{product.quantity}</p>
//                 <button
//                   className="px-2 border rounded"
//                   onClick={() => dispatch(increaseQuantity({ id: String(product.id) }))}                >
//                   +
//                 </button>
//               </div>

//               {/* Subtotal + Remove */}
//               <div className="flex items-center justify-between md:justify-start gap-4">
//                 <p className="text-sm font-semibold">
//                   ${(product.quantity * product.price).toFixed(2)}
//                 </p>
//                 <button
//                   className="text-red-500 hover:text-red-700"
//                   onClick={() =>
//                     dispatch(removeFromCart({ id: String(product.id) }))
//                   }
//                 >
//                   <FaTrashAlt />
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Cart Summary */}
//           <div className="mt-8 border-t pt-6">
//             <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
//             <div className="flex flex-col gap-3">
//               <div className="flex justify-between">
//                 <span>Total Items:</span>
//                 <span>{cart.products.length}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping Address:</span>
//                 <div className="flex flex-col items-end">
//                   <span>{address}</span>
//                   <button
//                     onClick={() => setIsModelOpen(true)}
//                     className="text-blue-600 text-sm underline"
//                   >
//                     Change address
//                   </button>
//                 </div>
//               </div>
//               <div className="flex justify-between text-lg font-semibold">
//                 <span>Total Price:</span>
//                 <span>${totalPrice.toFixed(2)}</span>
//               </div>
//               <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//               onClick={() => navigate('/checkout')}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>

//           {/* Address Modal */}
//           {isModelOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <ChangeAddress
//                   setAddress={setAddress}
//                   setIsModelOpen={setIsModelOpen}
//                 />
//                 <button
//                   onClick={() => setIsModelOpen(false)}
//                   className="mt-4 px-4 py-2 bg-gray-200 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (        <div className="flex flex-col items-center justify-center flex-1">
//           <img src={EmptyCart} alt="Empty Cart" className="w-64 h-auto" />
//           <p className="mt-4 text-gray-500">Your cart is empty.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../assets/Images/emptycart.png";
import { FaTrashAlt } from "react-icons/fa";
import ChangeAddress from "../components/ChangeAddress";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [address, setAddress] = useState("Main Street, 0012");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCartProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const updateQuantity = async (id: string, type: "increase" | "decrease") => {
    try {
      const url = `/api/cart/${type}`;
      const res = await axios.patch(url, { productId: id });
      setCartProducts(res.data.products);
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const res = await axios.delete(`/api/cart/remove/${id}`);
      setCartProducts(res.data.products);
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Add the JSX return
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartProducts.length === 0 ? (
        <div className="text-center">
          <img
            src={EmptyCart}
            alt="Empty Cart"
            className="w-64 mx-auto mb-4"
          />
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500">₹{product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(product.id, "decrease")}
                  className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, "increase")}
                  className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
                <FaTrashAlt
                  onClick={() => removeItem(product.id)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-semibold">
            Total: ₹{totalPrice}
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

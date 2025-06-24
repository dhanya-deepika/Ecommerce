import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const [order, setOrder] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been placed successfully.
      </p>

      {order ? (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-sm text-gray-500 mb-2">
            Order Date: {new Date(order.date).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Payment Method: {order.paymentMethod.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Total: ${order.totalAmount.toFixed(2)}
          </p>

          <div className="space-y-3">
            {order.products.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button
              className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
              onClick={() => navigate("/track-order")}
            >
              Track Order
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No order found.</p>
      )}
    </div>
  );
};

export default ThankYou;

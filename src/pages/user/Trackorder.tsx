import React, { useEffect, useState } from "react";

const TrackOrder = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      {order ? (
        <div className="max-w-xl w-full bg-white shadow p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Order placed on: {new Date(order.date).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Payment Method: {order.paymentMethod.toUpperCase()}
          </p>

          <h2 className="text-lg font-semibold mb-2">Status</h2>
          <p className="text-green-600">📦 Your order is being prepared!</p>
          {/* You can later update this with real status logic */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Shipping To</h2>
          <p className="text-gray-700">
            {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
            {order.shippingInfo.zip}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No order to track.</p>
      )}
    </div>
  );
};

export default TrackOrder;

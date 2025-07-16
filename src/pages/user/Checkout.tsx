import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice";

const Checkout = ({ setOrder }: { setOrder: (order: any) => void }) => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [billingToggle, setBillingToggle] = useState(false);
  const [shippingToggle, setShippingToggle] = useState(false);
  const [paymentToggle, setPaymentToggle] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zip: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    codAgreement: false,
  });

  const totalAmount = cart.products.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (!paymentMethod) return alert("Please select a payment method.");
    if (!billingInfo.name || !billingInfo.email || !billingInfo.phone)
      return alert("Please complete billing information.");
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.zip)
      return alert("Please complete shipping information.");

    if (paymentMethod === "credit-card") {
      const { cardName, cardNumber, expiry, cvv } = paymentDetails;
      if (!cardName || !cardNumber || !expiry || !cvv)
        return alert("Please complete all credit card details.");
    } else if (paymentMethod === "upi") {
      if (!paymentDetails.upiId)
        return alert("Please enter your UPI ID.");
    } else if (paymentMethod === "cod") {
      if (!paymentDetails.codAgreement)
        return alert("Please accept the COD agreement.");
    }

    const newOrder = {
      products: cart.products,
      totalAmount,
      billingInfo,
      shippingInfo,
      paymentMethod,
      paymentDetails,
      date: new Date().toISOString(),
    };

    localStorage.setItem("order", JSON.stringify(newOrder));
    setOrder(newOrder);
    alert("Order placed successfully!");
    navigate("/thank-you");
  };

  return (
    <div className="container mx-auto py-8 min-h-screen px-4 md:px-16 lg:px-24">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Checkout</h3>
          <div className="flex flex-col lg:flex-row gap-10 mt-8">
            {/* LEFT - Cart Products */}
            <div className="lg:w-2/3">
              <div className="flex justify-between border-b items-center mb-4 text-sm font-bold">
                <p>PRODUCT</p>
                <div className="flex space-x-8">
                  <p>PRICE</p>
                  <p>QUANTITY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>

              {cart.products.map((product: any) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border-b py-3 text-sm"
                >
                  <div className="flex items-center space-x-4 w-2/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <p>{product.name}</p>
                  </div>
                  <p>${product.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 border rounded"
                      onClick={() =>
                        dispatch(decreaseQuantity({ id: product.id }))
                      }
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      className="px-2 border rounded"
                      onClick={() =>
                        dispatch(increaseQuantity({ id: product.id }))
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>${(product.price * product.quantity).toFixed(2)}</p>
                  <button
                    className="text-red-500"
                    onClick={() => dispatch(removeFromCart({ id: product.id }))}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT - Checkout Form */}
            <div className="lg:w-1/3 bg-gray-100 p-6 rounded-md">
              <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
              <div className="mb-3">
                <p className="text-sm">Total Items: {cart.totalQuantity}</p>
                <p className="text-sm">
                  Total Price: ${totalAmount.toFixed(2)}
                </p>
              </div>

              {/* Billing Info */}
              <div className="mt-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setBillingToggle(!billingToggle)}
                >
                  <label className="text-sm font-medium">Billing Info</label>
                  {billingToggle ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {billingToggle && (
                  <div className="space-y-3 mt-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-2 border rounded"
                      value={billingInfo.name}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full p-2 border rounded"
                      value={billingInfo.email}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, email: e.target.value })
                      }
                    />
                    <input
                      type="tel"
                      placeholder="123-456-7890"
                      className="w-full p-2 border rounded"
                      value={billingInfo.phone}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, phone: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className="mt-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setShippingToggle(!shippingToggle)}
                >
                  <label className="text-sm font-medium">Shipping Information</label>
                  {shippingToggle ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {shippingToggle && (
                  <div className="mt-2 space-y-3">
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full p-2 border rounded"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full p-2 border rounded"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, city: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="w-full p-2 border rounded"
                      value={shippingInfo.zip}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, zip: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="mt-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setPaymentToggle(!paymentToggle)}
                >
                  <label className="text-sm font-medium">Payment Method</label>
                  {paymentToggle ? <FaAngleUp /> : <FaAngleDown />}
                </div>

                {paymentToggle && (
                  <div className="mt-2 space-y-3">
                    <select
                      className="w-full p-2 border rounded"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="upi">UPI</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          className="w-full p-2 border rounded"
                          value={paymentDetails.cardName}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cardName: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-2 border rounded"
                          value={paymentDetails.cardNumber}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cardNumber: e.target.value,
                            })
                          }
                        />
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Expiry (MM/YY)"
                            className="w-1/2 p-2 border rounded"
                            value={paymentDetails.expiry}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                expiry: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-1/2 p-2 border rounded"
                            value={paymentDetails.cvv}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                cvv: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <input
                        type="text"
                        placeholder="Enter your UPI ID (e.g. name@upi)"
                        className="w-full p-2 border rounded"
                        value={paymentDetails.upiId}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            upiId: e.target.value,
                          })
                        }
                      />
                    )}

                    {paymentMethod === "cod" && (
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          Please ensure someone is available at the address to
                          receive the order.
                        </p>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={paymentDetails.codAgreement}
                            onChange={(e) =>
                              setPaymentDetails({
                                ...paymentDetails,
                                codAgreement: e.target.checked,
                              })
                            }
                          />
                          <span>
                            I agree to pay the full amount in cash upon delivery
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Place Order Button */}
              <button
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;

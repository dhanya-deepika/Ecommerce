import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangeAddress = ({
  setAddress,
  setIsModelOpen,
}: {
  setAddress: (address: string) => void;
  setIsModelOpen: (isOpen: boolean) => void;
}) => {
  const [newAddress, setNewAddress] = useState("");
  const [error, setError] = useState("");

  // Fetch existing address from dummy API on mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await res.json();
        if (data?.address) {
          const fullAddress = `${data.address.street}, ${data.address.city}`;
          setNewAddress(fullAddress);
        }
      } catch (err) {
        toast.error("Failed to load address from server.");
      }
    };

    fetchAddress();
  }, []);

  const handleSave = async () => {
    const trimmedAddress = newAddress.trim();

    if (!trimmedAddress || trimmedAddress.length < 10) {
      setError("⚠️ Address must be at least 10 characters.");
      toast.error("Invalid address. Please enter a valid address.");
      return;
    }

    try {
      // Dummy PUT request to simulate update
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: trimmedAddress,
        }),
      });

      if (!response.ok) throw new Error("Failed to update address");

      setAddress(trimmedAddress); // Update parent state
      toast.success("Address updated successfully!");
      setIsModelOpen(false);
    } catch (err) {
      toast.error("Failed to update address. Try again.");
    }
  };

  return (
    <div>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
        New Shipping Address
      </label>
      <input
        id="address"
        type="text"
        placeholder="Enter new address"
        value={newAddress}
        className={`border p-2 w-full mb-2 rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onChange={(e) => {
          setNewAddress(e.target.value);
          if (error) setError("");
        }}
      />
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <div className="flex justify-end">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          onClick={() => setIsModelOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default ChangeAddress;

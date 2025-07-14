import React, { useEffect } from "react";
import toast from "react-hot-toast"; // Make sure to install: npm install react-hot-toast

const ChangeAddress = ({
  setAddress,
  setIsModelOpen,
}: {
  setAddress: (address: string) => void;
  setIsModelOpen: (isOpen: boolean) => void;
}) => {
  const [newAddress, setNewAddress] = React.useState("");
  const [error, setError] = React.useState("");

  // Load address from localStorage if available
  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setNewAddress(savedAddress);
    }
  }, []);

  const handleSave = () => {
    const trimmedAddress = newAddress.trim();

    if (!trimmedAddress || trimmedAddress.length < 10) {
      setError("⚠️ Address must be at least 10 characters.");
      toast.error("Invalid address. Please enter a valid address.");
      return;
    }

    // Update app state and persist in localStorage
    setAddress(trimmedAddress);
    localStorage.setItem("userAddress", trimmedAddress);
    toast.success("Address updated successfully!");
    setIsModelOpen(false);
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

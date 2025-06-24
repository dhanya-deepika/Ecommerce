import React, { useState, useEffect } from "react";

interface ProductFormProps {
  mode: "add" | "edit";
  productId?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    if (mode === "edit" && productId) {
      // In future: fetch product data from backend
      // Set form data with existing product info
    }
  }, [mode, productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      // Future: send POST request
    } else {
      // Future: send PUT request
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="border p-2 w-full"
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full"
      />
      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 w-full"
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {mode === "add" ? "Add Product" : "Update Product"}
      </button>
    </form>
  );
};

export default ProductForm;

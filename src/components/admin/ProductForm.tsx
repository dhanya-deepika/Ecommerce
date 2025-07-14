import React, { useState } from "react";

const categories = [
  {
    id: "men",
    name: "Men",
    subcategories: ["Shirts", "Pants", "Watches"]
  },
  {
    id: "women",
    name: "Women",
    subcategories: ["Sarees", "Chappals", "Watches"]
  },
  {
    id: "kids",
    name: "Kids",
    subcategories: ["Toys", "Footwear", "Clothes"]
  }
];

const ProductForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory(""); // Reset subcategory on change
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  const currentSubcategories =
    categories.find((cat) => cat.id === selectedCategory)?.subcategories || [];

  return (
    <form className="space-y-4">
      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Subcategory Dropdown */}
      <select
        value={selectedSubcategory}
        onChange={handleSubcategoryChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Subcategory</option>
        {currentSubcategories.map((sub, index) => (
          <option key={index} value={sub}>
            {sub}
          </option>
        ))}
      </select>

      {/* Additional Fields */}
      <input placeholder="Product Name" className="w-full p-2 border rounded" />
      {/* Add other fields as needed */}
    </form>
  );
};

export default ProductForm;

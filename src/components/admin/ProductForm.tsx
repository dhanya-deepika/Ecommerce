// import React, { useState } from "react";

// const categories = [
//   {
//     id: "men",
//     name: "Men",
//     subcategories: ["Shirts", "Pants", "Watches"]
//   },
//   {
//     id: "women",
//     name: "Women",
//     subcategories: ["Sarees", "Chappals", "Watches"]
//   },
//   {
//     id: "kids",
//     name: "Kids",
//     subcategories: ["Toys", "Footwear", "Clothes"]
//   }
// ];

// const ProductForm = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(e.target.value);
//     setSelectedSubcategory(""); // Reset subcategory on change
//   };

//   const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedSubcategory(e.target.value);
//   };

//   const currentSubcategories =
//     categories.find((cat) => cat.id === selectedCategory)?.subcategories || [];

//   return (
//     <form className="space-y-4">
//       {/* Category Dropdown */}
//       <select
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//         className="w-full p-2 border rounded"
//         required
//       >
//         <option value="">Select Category</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       {/* Subcategory Dropdown */}
//       <select
//         value={selectedSubcategory}
//         onChange={handleSubcategoryChange}
//         className="w-full p-2 border rounded"
//         required
//       >
//         <option value="">Select Subcategory</option>
//         {currentSubcategories.map((sub, index) => (
//           <option key={index} value={sub}>
//             {sub}
//           </option>
//         ))}
//       </select>

//       {/* Additional Fields */}
//       <input placeholder="Product Name" className="w-full p-2 border rounded" />
//       {/* Add other fields as needed */}
//     </form>
//   );
// };

// export default ProductForm;
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  subcategoryId: string;
}

const ProductForm = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productData, setProductData] = useState({ name: "", price: "", image: "" });
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  // Load categories, subcategories, and products from localStorage
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    const storedSubcategories = JSON.parse(localStorage.getItem("subcategories") || "[]");

    const combined = storedCategories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      subcategories: storedSubcategories
        .filter((sub: any) => sub.categoryId === cat.id)
        .map((sub: any) => ({ id: sub.id, name: sub.name })),
    }));

    setCategories(combined);

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubcategory) return alert("Please select category & subcategory");

    const newProduct: Product = {
      id: editProductId || uuidv4(),
      name: productData.name,
      price: parseFloat(productData.price),
      image: productData.image,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
    };

    let updatedProducts;
    if (editProductId) {
      updatedProducts = products.map((p) => (p.id === editProductId ? newProduct : p));
    } else {
      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reset form
    setSelectedCategory("");
    setSelectedSubcategory("");
    setProductData({ name: "", price: "", image: "" });
    setEditProductId(null);
  };

  const handleEdit = (product: Product) => {
    setSelectedCategory(product.categoryId);
    setSelectedSubcategory(product.subcategoryId);
    setProductData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    });
    setEditProductId(product.id);
  };

  const handleDelete = (id: string) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
    localStorage.setItem("products", JSON.stringify(filtered));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{editProductId ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        {/* Category */}
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

        {/* Subcategory */}
        <select
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Subcategory</option>
          {categories
            .find((cat) => cat.id === selectedCategory)
            ?.subcategories.map((sub: any) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
        </select>

        {/* Product Inputs */}
        <input
          name="name"
          value={productData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {editProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <h3 className="text-lg font-semibold mb-3">Product List</h3>
      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between border p-3 rounded shadow-sm bg-white"
            >
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">Price: ₹{p.price}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductForm;

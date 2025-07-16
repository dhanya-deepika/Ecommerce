// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// interface ProductFormProps {
//   mode: "add" | "edit";
//   productId?: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   categoryId: string;
//   subcategoryId: string;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ mode, productId }) => {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");
//   const [productData, setProductData] = useState({ name: "", price: "", image: "" });
//   const [products, setProducts] = useState<Product[]>([]);

//   // Load data
//   useEffect(() => {
//     const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
//     const storedSubcategories = JSON.parse(localStorage.getItem("subcategories") || "[]");

//     const combined = storedCategories.map((cat: any) => ({
//       id: cat.id,
//       name: cat.name,
//       subcategories: storedSubcategories
//         .filter((sub: any) => sub.categoryId === cat.id)
//         .map((sub: any) => ({ id: sub.id, name: sub.name })),
//     }));

//     setCategories(combined);

//     const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
//     setProducts(storedProducts);

//     if (mode === "edit" && productId) {
//       const existing = storedProducts.find((p: Product) => p.id === productId);
//       if (existing) {
//         setSelectedCategory(existing.categoryId);
//         setSelectedSubcategory(existing.subcategoryId);
//         setProductData({
//           name: existing.name,
//           price: existing.price.toString(),
//           image: existing.image,
//         });
//       }
//     }
//   }, [mode, productId]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setProductData({ ...productData, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(e.target.value);
//     setSelectedSubcategory("");
//   };

//   const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedSubcategory(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedCategory || !selectedSubcategory) return alert("Please select category & subcategory");

//     const updatedProduct: Product = {
//       id: productId || uuidv4(),
//       name: productData.name,
//       price: parseFloat(productData.price),
//       image: productData.image,
//       categoryId: selectedCategory,
//       subcategoryId: selectedSubcategory,
//     };

//     let updatedList;
//     if (mode === "edit" && productId) {
//       updatedList = products.map((p) => (p.id === productId ? updatedProduct : p));
//     } else {
//       updatedList = [...products, updatedProduct];
//     }

//     localStorage.setItem("products", JSON.stringify(updatedList));
//     alert(`Product ${mode === "edit" ? "updated" : "added"} successfully`);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
//       {/* Category */}
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

//       {/* Subcategory */}
//       <select
//         value={selectedSubcategory}
//         onChange={handleSubcategoryChange}
//         className="w-full p-2 border rounded"
//         required
//       >
//         <option value="">Select Subcategory</option>
//         {categories
//           .find((cat) => cat.id === selectedCategory)
//           ?.subcategories.map((sub: any) => (
//             <option key={sub.id} value={sub.id}>
//               {sub.name}
//             </option>
//           ))}
//       </select>

//       {/* Inputs */}
//       <input
//         name="name"
//         value={productData.name}
//         onChange={handleInputChange}
//         placeholder="Product Name"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <input
//         name="price"
//         type="number"
//         value={productData.price}
//         onChange={handleInputChange}
//         placeholder="Price"
//         required
//         className="w-full p-2 border rounded"
//       />
//       <input
//         name="image"
//         value={productData.image}
//         onChange={handleInputChange}
//         placeholder="Image URL"
//         className="w-full p-2 border rounded"
//       />

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//       >
//         {mode === "edit" ? "Update Product" : "Add Product"}
//       </button>
//     </form>
//   );
// };

// export default ProductForm;
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ProductFormProps {
  mode: "add" | "edit";
  productId?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  subcategoryId: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productData, setProductData] = useState({ name: "", price: "", image: "" });
  const [products, setProducts] = useState<Product[]>([]);

  // Load data
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

    if (mode === "edit" && productId) {
      const existing = storedProducts.find((p: Product) => p.id === productId);
      if (existing) {
        setSelectedCategory(existing.categoryId);
        setSelectedSubcategory(existing.subcategoryId);
        setProductData({
          name: existing.name,
          price: existing.price.toString(),
          image: existing.image,
        });
      }
    }
  }, [mode, productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubcategory) return alert("Please select category & subcategory");

    const updatedProduct: Product = {
      id: productId || uuidv4(),
      name: productData.name,
      price: parseFloat(productData.price),
      image: productData.image,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
    };

    let updatedList;
    if (mode === "edit" && productId) {
      updatedList = products.map((p) => (p.id === productId ? updatedProduct : p));
    } else {
      updatedList = [...products, updatedProduct];
    }

    localStorage.setItem("products", JSON.stringify(updatedList));
    alert(`Product ${mode === "edit" ? "updated" : "added"} successfully`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
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

      {/* Inputs */}
      <input
        name="name"
        value={productData.name}
        onChange={handleInputChange}
        placeholder="Product Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="price"
        type="number"
        value={productData.price}
        onChange={handleInputChange}
        placeholder="Price"
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="image"
        value={productData.image}
        onChange={handleInputChange}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {mode === "edit" ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;

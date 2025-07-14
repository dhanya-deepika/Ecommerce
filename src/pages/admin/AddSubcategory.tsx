// import { useEffect, useState } from "react";
// import axios from "axios";

// const AddSubcategory = () => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [categories, setCategories] = useState([]);
//   const [categoryId, setCategoryId] = useState("");

//   // Fetch categories for dropdown
//   useEffect(() => {
//     axios.get("http://192.168.0.93:3000/api/categories").then((res) => {
//       setCategories(res.data);
//     });
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!image || !name || !categoryId) {
//       alert("All fields required");
//       return;
//     }

//     // 1. Upload Image
//     const formData = new FormData();
//     formData.append("file", image);

//     const uploadRes = await axios.post("http://192.168.0.93:3000/api/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const imageUrl = uploadRes.data.url; // change if backend returns differently

//     // 2. Send Subcategory Data
//     await axios.post("http://192.168.0.93:3000/api/addSubcategory", {
//       name,
//       img: imageUrl,
//       categoryId,
//     });

//     alert("Subcategory added!");
//     setName("");
//     setImage(null);
//     setCategoryId("");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Add Subcategory</h2>
//       <form onSubmit={handleSubmit}>
//         <select
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//           required
//           className="w-full p-2 border rounded mb-4"
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat: any) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Subcategory Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full p-2 border rounded mb-4"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="w-full mb-4"
//           required
//         />

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Add Subcategory
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddSubcategory;


// pages/admin/AddSubcategory.tsx
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AddSubcategory = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem("categories") || "[]"));
    setSubcategories(JSON.parse(localStorage.getItem("subcategories") || "[]"));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId) return alert("Fill all fields");

    const newSub = { id: uuidv4(), name, categoryId };
    const updated = [...subcategories, newSub];
    localStorage.setItem("subcategories", JSON.stringify(updated));
    setSubcategories(updated);
    setName(""); setCategoryId("");
    alert("Subcategory added");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Subcategory</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subcategory Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Subcategory
        </button>
      </form>
    </div>
  );
};

export default AddSubcategory;

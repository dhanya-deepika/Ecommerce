// import { useEffect, useState } from "react";
// import axios from "axios";

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [MRP, setMRP] = useState("");
//   const [actualPrice, setActualPrice] = useState("");
//   const [noOfProduct, setNoOfProduct] = useState("");
//   const [weight, setWeight] = useState("");
//   const [description, setDescription] = useState("");
//   const [subcategoryId, setSubcategoryId] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [image, setImage] = useState<File | null>(null);

//   // Fetch subcategories for dropdown
//   useEffect(() => {
//     axios.get("http://192.168.0.93:3000/api/subcategories").then((res) => {
//       setSubcategories(res.data);
//     });
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name || !actualPrice || !MRP || !subcategoryId || !image) {
//       alert("All fields required.");
//       return;
//     }

//     // 1. Upload Image
//     const formData = new FormData();
//     formData.append("file", image);

//     const uploadRes = await axios.post("http://192.168.0.93:3000/api/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const imageUrl = uploadRes.data.url;

//     // 2. Submit product data
//     await axios.post("http://192.168.0.93:3000/api/addProduct", {
//       name,
//       MRP,
//       actualPrice,
//       noOfProduct,
//       weight,
//       description,
//       img: imageUrl,
//       subcategoryId,
//     });

//     alert("Product added successfully!");
//     // Clear form
//     setName("");
//     setMRP("");
//     setActualPrice("");
//     setNoOfProduct("");
//     setWeight("");
//     setDescription("");
//     setImage(null);
//     setSubcategoryId("");
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">

//         <select
//           value={subcategoryId}
//           onChange={(e) => setSubcategoryId(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Subcategory</option>
//           {subcategories.map((sub: any) => (
//             <option key={sub._id} value={sub._id}>
//               {sub.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           placeholder="MRP"
//           value={MRP}
//           onChange={(e) => setMRP(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           placeholder="Actual Price"
//           value={actualPrice}
//           onChange={(e) => setActualPrice(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="text"
//           placeholder="No. of Products in Stock"
//           value={noOfProduct}
//           onChange={(e) => setNoOfProduct(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="text"
//           placeholder="Weight"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="w-full"
//           required
//         />

//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

// pages/admin/AddProduct.tsx
// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [MRP, setMRP] = useState("");
//   const [actualPrice, setActualPrice] = useState("");
//   const [noOfProduct, setNoOfProduct] = useState("");
//   const [weight, setWeight] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [subcategoryId, setSubcategoryId] = useState("");

//   const [categories, setCategories] = useState<any[]>([]);
//   const [subcategories, setSubcategories] = useState<any[]>([]);

//   useEffect(() => {
//     setCategories(JSON.parse(localStorage.getItem("categories") || "[]"));
//     setSubcategories(JSON.parse(localStorage.getItem("subcategories") || "[]"));
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name || !actualPrice || !MRP || !subcategoryId || !image) {
//       alert("All fields required.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newProduct = {
//         id: uuidv4(),
//         name,
//         MRP,
//         actualPrice,
//         noOfProduct,
//         weight,
//         description,
//         img: reader.result,
//         subcategoryId,
//       };

//       const existing = JSON.parse(localStorage.getItem("products") || "[]");
//       localStorage.setItem("products", JSON.stringify([...existing, newProduct]));

//       alert("Product added successfully!");
//       setName(""); setMRP(""); setActualPrice(""); setNoOfProduct("");
//       setWeight(""); setDescription(""); setImage(null); setSubcategoryId("");
//     };
//     reader.readAsDataURL(image);
//   };
//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <select
//           value={subcategoryId}
//           onChange={(e) => setSubcategoryId(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Select Subcategory</option>
//           {categories.map((cat) => (
//             <optgroup key={cat.id} label={cat.name}>
//               {subcategories
//                 .filter((sub) => sub.categoryId === cat.id)
//                 .map((sub) => (
//                   <option key={sub.id} value={sub.id}>
//                     {sub.name}
//                   </option>
//                 ))}
//             </optgroup>
//           ))}
//         </select>

//         <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
//         <input type="text" placeholder="MRP" value={MRP} onChange={(e) => setMRP(e.target.value)} className="w-full p-2 border rounded" required />
//         <input type="text" placeholder="Actual Price" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} className="w-full p-2 border rounded" required />
//         <input type="text" placeholder="Stock Quantity" value={noOfProduct} onChange={(e) => setNoOfProduct(e.target.value)} className="w-full p-2 border rounded" />
//         <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded" />
//         <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
//         <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="w-full" required />
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [MRP, setMRP] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const [noOfProduct, setNoOfProduct] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    const cat = JSON.parse(localStorage.getItem("categories") || "[]");
    const sub = JSON.parse(localStorage.getItem("subcategories") || "[]");
    setCategories(cat);
    setSubcategories(sub);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !actualPrice || !MRP || !subcategoryId || !image) {
      alert("All fields required.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newProduct = {
        id: uuidv4(),
        name,
        MRP,
        actualPrice,
        noOfProduct,
        weight,
        description,
        img: reader.result,
        subcategoryId,
      };

      const existing = JSON.parse(localStorage.getItem("products") || "[]");
      localStorage.setItem("products", JSON.stringify([...existing, newProduct]));

      alert("Product added successfully!");

      // Reset form
      setName("");
      setMRP("");
      setActualPrice("");
      setNoOfProduct("");
      setWeight("");
      setDescription("");
      setImage(null); 
      setSubcategoryId("");
      setCategoryId("");
    };
    reader.readAsDataURL(image);
  };

  const filteredSubcategories = subcategories.filter((sub) => sub.categoryId === categoryId);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Select Category */}
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategoryId(""); // reset subcategory
          }}
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

        {/* Select Subcategory */}
        <select
          value={subcategoryId}
          onChange={(e) => setSubcategoryId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="MRP" value={MRP} onChange={(e) => setMRP(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Actual Price" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Stock Quantity" value={noOfProduct} onChange={(e) => setNoOfProduct(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="w-full" required />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

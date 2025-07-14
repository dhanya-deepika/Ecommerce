// import React, { useState } from 'react';
// import axios from 'axios';

// const AddCategory = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     image: null as File | null,
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, files } = e.target;

//     if (name === 'image' && files && files.length > 0) {
//       setFormData(prev => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append('name', formData.name);
//       if (formData.image) {
//         data.append('image', formData.image);
//       }

//       const response = await axios.post('http://192.168.0.93:3000/api/addCategory', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage('Category added successfully!');
//       setFormData({ name: '', image: null });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//       setMessage('Failed to add category.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
//       {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Category Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="mt-1 p-2 w-full border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Image</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="mt-1 p-2 w-full border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add Category
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;

// ✅ AddCategory.tsx (Using LocalStorage)
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(stored);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) {
      alert('All fields required');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newCategory = {
        id: uuidv4(),
        name,
        image: reader.result,
      };

      const updated = [...categories, newCategory];
      localStorage.setItem('categories', JSON.stringify(updated));
      setCategories(updated);

      setName('');
      setImage(null);
      alert('Category added!');
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </form>

      {/* Category List View */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Added Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-3 border rounded shadow text-center">
                <img src={cat.image} alt={cat.name} className="w-24 h-24 mx-auto object-cover mb-2" />
                <p className="capitalize font-medium">{cat.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;

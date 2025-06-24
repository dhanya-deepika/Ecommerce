import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files && files.length > 0) {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await axios.post('http://192.168.0.93:3000/api/addCategory', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Category added successfully!');
      setFormData({ name: '', image: null });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Failed to add category.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

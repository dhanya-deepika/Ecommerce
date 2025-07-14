import React, { useState } from "react";
import axios from "axios";
// import type { image } from "framer-motion/client";

interface CategoryFormProps {
  mode: "add" | "edit";
  categoryId?: string; // For future use if editing
}

const CategoryForm: React.FC<CategoryFormProps> = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axios.post("http://192.168.0.92:3000/api/addCategory", formData);
        setMessage("Category added successfully!");
        setFormData({ name: "", image: "" });
      } else {
        // future: PUT request to edit category
      }
    } catch (error: any) {
      console.error("Error adding category:", error);
      setMessage("Failed to add category.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Category Name"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        name="description"
        value={formData.image}
        onChange={handleChange}
        placeholder="Category Description"
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {mode === "add" ? "Add Category" : "Update Category"}
      </button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
};

export default CategoryForm;

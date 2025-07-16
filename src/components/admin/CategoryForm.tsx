import React, { useState, useEffect } from "react";
import axios from "axios";

interface CategoryFormProps {
  mode: "add" | "edit";
  categoryId?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ mode, categoryId }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // For edit mode: fetch existing data
  useEffect(() => {
    if (mode === "edit" && categoryId) {
      axios.get(`http://192.168.0.92:3000/api/getCategory/${categoryId}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("Failed to load category", err));
    }
  }, [mode, categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "add") {
        await axios.post("http://192.168.0.92:3000/api/addCategory", formData);
        setMessage("Category added successfully!");
        setFormData({ name: "", image: "" });
      } else if (mode === "edit" && categoryId) {
        await axios.put(`http://192.168.0.92:3000/api/editCategory/${categoryId}`, formData);
        setMessage("Category updated successfully!");
      }
    } catch (error: any) {
      console.error("Error submitting category:", error);
      setMessage("Failed to submit category.");
    } finally {
      setLoading(false);
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
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Category Description or Image URL"
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : mode === "add" ? "Add Category" : "Update Category"}
      </button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
};

export default CategoryForm;

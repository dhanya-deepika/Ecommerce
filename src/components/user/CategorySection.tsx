
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  img: string;
  subcategories: any[];
}

const BACKEND_URL = "http://192.168.0.75:3001";

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("Calling API...");
        const res = await axios.get(`${BACKEND_URL}/api/getAllCategories`);
        console.log("Response:", res.data);
        if (res.data && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
  
    fetchCategories();
  }, []);
  

  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-14 cursor-pointer">
      {categories.map((category) => (
        <div
          key={category.id}
          className="relative h-64 transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
        >
          <img
            src={category.img ? `${BACKEND_URL}${category.img}` : "https://via.placeholder.com/300"}
            alt={category.name}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            <p className="text-xl font-bold">{category.name}</p>
            <p className="text-sm">View All</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;

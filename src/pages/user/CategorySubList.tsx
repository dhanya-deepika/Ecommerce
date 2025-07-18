import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://192.168.0.75:3001";

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

const CategorySubList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const categories = JSON.parse(localStorage.getItem("categories") || "[]");
        const found = categories.find(
          (cat: any) => cat.name.toLowerCase() === categoryName?.toLowerCase()
        );

        if (!found) {
          console.warn("Category not found in localStorage");
          return;
        }

        const categoryId = found.id;

        const res = await axios.get(`${API_BASE_URL}/api/getSubcategoriesByCategory`, {
          params: { categoryId },
        });

        if (res.data && Array.isArray(res.data.subcategories)) {
          setSubcategories(res.data.subcategories);
        } else {
          console.warn("Unexpected API response:", res.data);
          setSubcategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
        setSubcategories([]);
      }
    };

    if (categoryName) {
      fetchSubcategories();
    }
  }, [categoryName]);

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center gap-6">
      {subcategories.length === 0 ? (
        <p className="text-center text-gray-500">No subcategories found.</p>
      ) : (
        subcategories.map((sub) => (
          <div
            key={sub.id}
            onClick={() => navigate(`/category/${categoryName}/${sub.name.toLowerCase()}`)}
            className="w-full sm:w-1/2 border p-6 shadow hover:scale-105 transition-transform duration-300 cursor-pointer rounded text-center"
          >
            <h3 className="text-xl capitalize font-semibold">{sub.name}</h3>
            <p className="text-sm text-gray-500">View All</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CategorySubList;

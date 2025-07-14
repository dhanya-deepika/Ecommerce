import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CategorySubList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState<{ id: string, name: string, categoryId: string }[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const found = categories.find((cat: any) => cat.name.toLowerCase() === categoryName?.toLowerCase());
    if (found) {
      setCategoryId(found.id);
    }
  }, [categoryName]);

  useEffect(() => {
    if (categoryId) {
      const allSubcategories = JSON.parse(localStorage.getItem("subcategories") || "[]");
      const filtered = allSubcategories.filter((sub: any) => sub.categoryId === categoryId);
      setSubcategories(filtered);
    }
  }, [categoryId]);

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

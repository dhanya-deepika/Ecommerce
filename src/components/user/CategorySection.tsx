// import { useNavigate } from "react-router-dom";
// import ManCategory from "../assets/images/men.png";
// import WomanCategory from "../assets/images/women.png";
// import KidCategory from "../assets/images/kid.png";

// const categories = [
//   {
//     title: "Men",
//     imageUrl: ManCategory,
//   },
//   {
//     title: "Women",
//     imageUrl: WomanCategory,
//   },
//   {
//     title: "Kids",
//     imageUrl: KidCategory,
//   },
// ];
// const CategorySection = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 cursor-pointer">
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           className="relative h-64 transform transition-transform duration-300 hover:scale-105"
//           onClick={() => navigate(`/category/${category.title.toLowerCase()}`)}
//         >
//           <img
//             src={category.imageUrl}
//             alt={`${category.title} category`}
//             className="w-full h-full object-cover rounded-lg shadow-md"
//           />
//           <div className="absolute top-45 left-2 text-black">
//             <p className="text-xl font-bold mt-2">{category.title}</p>
//             <p className="text-sm text-gray-500">View All</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default CategorySection;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManCategory from "../../assets/images/men.png";
import WomanCategory from "../../assets/images/women.png";
import KidCategory from "../../assets/images/kid.png";

const fallbackImages: Record<string, string> = {
  men: ManCategory,
  women: WomanCategory,
  kids: KidCategory,
};

interface Category {
  title: string;
  imageUrl: string;
}

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("");
        const data: string[] = await response.json();

        const formattedCategories = data.map((title) => ({
          title: title.charAt(0).toUpperCase() + title.slice(1), 
          imageUrl: fallbackImages[title.toLowerCase()] || "https://via.placeholder.com/300",
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-14 cursor-pointer">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative h-64 transform transition-transform duration-300 hover:scale-105"
          onClick={() => navigate(`/category/${category.title.toLowerCase()}`)}
        >
          <img
            src={category.imageUrl}
            alt={`${category.title} category`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
          <div className="absolute top-45 left-2 text-black">
            <p className="text-xl font-bold mt-2">{category.title}</p>
            <p className="text-sm text-gray-500">View All</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;


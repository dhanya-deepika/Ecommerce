// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const CategoryProducts = () => {
//   const { categoryName, subCategoryName } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await axios.get(
//         `http://localhost:5000/api/products?category=${categoryName}&subcategory=${subCategoryName}`
//       );
//       setProducts(res.data);
//     };

//     fetchProducts();
//   }, [categoryName, subCategoryName]);

//   return (
//     <div className="container mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6 capitalize">
//         {categoryName} → {subCategoryName}
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {products.map((p) => (
//           <div key={p.id} className="p-4 border rounded-lg shadow">
//             <img src={p.image} className="w-full h-48 object-cover mb-4" />
//             <h3 className="text-lg font-semibold">{p.name}</h3>
//             <p className="text-gray-600">₹{p.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryProducts;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  img: string;
  MRP: number;
  actualPrice: number;
  category: string;
  subcategory: string;
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const CategoryProducts = () => {
  const { categoryName = "", subCategoryName = "" } = useParams();
  const category = capitalize(categoryName);
  const subcategory = capitalize(subCategoryName);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    const filtered = stored.filter(
      (prod: Product) =>
        prod.category?.toLowerCase() === category.toLowerCase() &&
        prod.subcategory?.toLowerCase() === subcategory.toLowerCase()
    );
    setProducts(filtered);
  }, [category, subcategory]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {category} → {subcategory}
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow bg-white">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-gray-500">₹{p.actualPrice}</p>
              <p className="text-sm text-green-600 line-through">₹{p.MRP}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;

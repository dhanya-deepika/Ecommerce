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
import axios from "axios";

const FILTER_OPTIONS = {
  Men: {
    Shirts: {
      type: ["check", "plain", "floral", "printed"],
      color: ["white", "black", "blue", "green"],
    },
    Pants: {
      type: ["jeans", "formal", "chinos"],
      color: ["black", "blue", "gray", "brown"],
    },
  },
  Women: {
    Sarees: {
      type: ["banarasi", "silk", "cotton", "chiffon"],
      color: ["red", "blue", "green", "yellow", "pink"],
    },
    Kurtis: {
      type: ["anarkali", "straight", "a-line"],
      color: ["red", "white", "blue"],
    },
  },
  Kids: {
    Frocks: {
      type: ["casual", "partywear"],
      color: ["pink", "yellow", "purple"],
    },
    Tshirts: {
      type: ["printed", "plain"],
      color: ["red", "green", "blue"],
    },
  },
};

const CategoryProducts = () => {
  const { categoryName, subCategoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    color: "",
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products?category=${categoryName}&subcategory=${subCategoryName}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [categoryName, subCategoryName]);

  useEffect(() => {
    let filtered = products;

    if (filters.type) {
      filtered = filtered.filter(
        (p) => p.type?.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.color) {
      filtered = filtered.filter(
        (p) => p.color?.toLowerCase() === filters.color.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value, // toggle filter
    }));
  };

  const categoryFilters =
    FILTER_OPTIONS[categoryName as keyof typeof FILTER_OPTIONS]?.[
      subCategoryName as keyof (typeof FILTER_OPTIONS)[typeof categoryName]
    ];

  return (
    <div className="container mx-auto mt-10 flex gap-6">
      {/* ✅ Sidebar Filters */}
      <div className="w-1/4 border p-4 rounded shadow bg-white">
        <h3 className="text-lg font-bold mb-4">Filters</h3>

        {/* Dynamic Type Filter */}
        {categoryFilters?.type && (
          <div className="mb-4">
            <h4 className="font-semibold">Type</h4>
            {categoryFilters.type.map((type) => (
              <label className="block capitalize" key={type}>
                <input
                  type="checkbox"
                  checked={filters.type === type}
                  onChange={() => handleFilterChange("type", type)}
                /> {type}
              </label>
            ))}
          </div>
        )}

        {/* Dynamic Color Filter */}
        {categoryFilters?.color && (
          <div className="mb-4">
            <h4 className="font-semibold">Color</h4>
            {categoryFilters.color.map((color) => (
              <label className="block capitalize" key={color}>
                <input
                  type="checkbox"
                  checked={filters.color === color}
                  onChange={() => handleFilterChange("color", color)}
                /> {color}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Product Grid */}
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {categoryName} → {subCategoryName}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="border p-4 rounded shadow bg-white">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-gray-600 mb-1 capitalize">
                  Color: {p.color}, Type: {p.type}
                </p>
                <p className="text-lg font-semibold text-green-600">
                  ₹{p.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

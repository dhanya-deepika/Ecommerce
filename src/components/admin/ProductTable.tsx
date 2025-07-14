// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { deleteProduct } from "../../redux/productSlice";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.products.products
  ) as Product[];

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  return (
    <table className="w-full border border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="text-center">
            <td className="border p-2">{product.name}</td>
            <td className="border p-2">{product.price}</td>
            <td className="border p-2">{product.category}</td>
            <td className="border p-2">
              <Link
                to={`/admin/edit-product/${product.id}`}
                className="text-blue-500 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";

const EditProduct = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <ProductForm mode="edit" productId={id} />
    </div>
  );
};

export default EditProduct;

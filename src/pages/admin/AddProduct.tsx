// src/pages/admin/AddProduct.tsx
import ProductForm from "../../components/admin/ProductForm";

const AddProduct = () => {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <ProductForm mode="add" />
    </div>
  );
};

export default AddProduct;

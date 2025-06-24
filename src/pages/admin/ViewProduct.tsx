// src/pages/admin/ViewProduct.tsx
import ProductTable from "../../components/admin/ProductTable";

const ViewProduct = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Product List</h2>
      <ProductTable />
    </div>
  );
};

export default ViewProduct;

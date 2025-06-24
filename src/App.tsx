import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart"; // ✅ SHOULD BE THISimport ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import TrackOrder from "./pages/Trackorder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FilterData from "./pages/FilterData";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/productSlice";
import CategoryProducts from "./pages/CategoryProducts.tsx"; // ⬅️ create this page
import CategorySubList from "./pages/CategorySubList";
import InfoDetail from "./pages/InfoDetail";



// ✅ Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ViewProduct from "./pages/admin/ViewProduct";
import ProductDetails from "./pages/ProductDetails";
import AddCategory from "./pages/admin/AddCategory.tsx";


function App() {

  const [order, setOrder] = useState<any>(null);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout setOrder={setOrder} />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/filter-data" element={<FilterData />} />

            {/* ✅ Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/category/:categoryName" element={<CategorySubList />} />
            <Route path="/admin/view-product" element={<ViewProduct />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route path="/category/:categoryName/:subCategoryName" element={<CategoryProducts />} />
            <Route path="/info/:topic" element={<InfoDetail />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );

}
export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import TrackOrder from "./pages/Trackorder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import FilterData from "./pages/FilterData";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/productSlice";
import CategoryProducts from "./pages/CategoryProducts";
import CategorySubList from "./pages/CategorySubList";
import InfoDetail from "./pages/InfoDetail";

// ✅ Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ViewProduct from "./pages/admin/ViewProduct";
import AddCategory from "./pages/admin/AddCategory";
import AddSubcategory from "./pages/admin/AddSubcategory";

import { Toaster } from "react-hot-toast";

function App() {
  const [order, setOrder] = useState<any>(null);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        {/* ✅ Toaster outside Routes */}
        <Toaster position="top-center" />
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
            <Route path="/info/:topic" element={<InfoDetail />} />

            {/* ✅ Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/view-product" element={<ViewProduct />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
           <Route path="/admin/add-subcategory" element={<AddSubcategory />} />

            {/* Category Routes */}
            <Route path="/category/:categoryName" element={<CategorySubList />} />
            <Route path="/category/:categoryName/:subCategoryName" element={<CategoryProducts />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

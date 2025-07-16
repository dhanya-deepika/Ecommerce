import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";
import Home from "./pages/user/Home";
import Cart from "./pages/user/Cart";
import ProductDetails from "./pages/user/ProductDetails";
import Checkout from "./pages/user/Checkout";
import ThankYou from "./pages/user/ThankYou";
import TrackOrder from "./pages/user/Trackorder";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";
import FilterData from "./pages/user/FilterData";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/productSlice";
import CategoryProducts from "./pages/user/CategoryProducts";
import CategorySubList from "./pages/user/CategorySubList";
import InfoDetail from "./pages/user/InfoDetail";

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
            {/* <Route path="/admin/edit-product/:id" element={<EditProduct />} /> */}
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

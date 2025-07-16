import  { useEffect } from "react";
import ProductCard from "../../components/user/ProductCard";
import HeroImage from "../../assets/images/hero.png";
import InfoSection from "../../components/user/InfoSection";
import CategorySection from "../../components/user/CategorySection";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/productSlice";
import type { RootState } from "../../redux/store";
// import axios from "axios";
import { mockData } from "../../mockData";



const Categories = ["Men", "Women", "Kids", "Shoes", "Accessories"];

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products) as
   Array<{ id: number; name: string; price: number; image: string }>;
  console.log("Products from Redux:", products);
  useEffect(() => {
    dispatch(setProducts(mockData));
  }, [dispatch]);
  
  return (
    <div>
      <div className="bg-white mt-2 px-4 md:px-16 lg:px-24">
        {/* Hero Section + Categories */}
        <div className="container mx-auto py-4 flex flex-col md:flex-row gap-4">
          {/* Left - Categories */}
          <div className="w-full md:w-3/12">
            <div className="h-full flex flex-col bg-gray-100 border">
              <div className="bg-black text-white text-xs font-bold px-2 py-2.5">
                SHOP BY CATEGORIES
              </div>a
              <ul className="space-y-4 p-3 overflow-y-auto flex-grow">
                {Categories.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm font-medium">
                    <div className="w-2 h-2 border border-red-500 rounded-full mr-2"></div>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative w-full md:w-9/12 h-[384px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={HeroImage}
              alt="Hero"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
            <div className="absolute top-1/3 left-6 z-20 space-y-4 text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                WELCOME TO Q-SHOP
              </h2>
              <p className="text-sm md:text-md max-w-xs">
                Discover stylish collections at unbeatable prices.
              </p>
              <button className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition duration-300 shadow-md hover:scale-105">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>

        {/* Info and Category Sections */}
        <InfoSection />
        <CategorySection />

        {/* Top Products */}
        <div className="container mx-auto mt-10 px-4">
          <h2 className="text-2xl font-bold mb-6 mt-16 text-center">
            Top Products
          </h2>
          <div className="grid grid-cols-1 mt-8 mb-8 sm:grid-cols-3 gap-6 cursor-pointer">
            {products.slice(0, 5).map((product: { id: number; name: string; price: number; image: string }, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

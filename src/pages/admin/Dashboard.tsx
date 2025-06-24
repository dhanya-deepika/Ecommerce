// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaPlusCircle,
//   FaClipboardList,
//   FaUsers,
//   FaUserShield,
//   FaBoxes,
//   FaThList,
// } from "react-icons/fa";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const dashboardItemsLeft = [
//     {
//       label: "Add Product",
//       icon: <FaPlusCircle size={28} className="text-indigo-600" />,
//       path: "/admin/add-product",
//     },
//     {
//       label: "View Products",
//       icon: <FaClipboardList size={28} className="text-green-600" />,
//       path: "/admin/view-products",
//     },
//     {
//       label: "Users",
//       icon: <FaUsers size={28} className="text-teal-600" />,
//       path: "/admin/users",
//     },
//   ];

//   const dashboardItemsRight = [
//     {
//       label: "Add Category",
//       icon: <FaThList size={28} className="text-orange-500" />,
//       path: "/admin/add-category",
//     },
//     {
//       label: "Orders",
//       icon: <FaBoxes size={28} className="text-yellow-500" />,
//       path: "/admin/orders",
//     },
//     {
//       label: "Add Admin",
//       icon: <FaUserShield size={28} className="text-blue-500" />,
//       path: "/admin/add-admin",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
//         Welcome, Admin
//       </h1>

//       <div className="flex flex-col lg:flex-row justify-center items-stretch gap-12 max-w-6xl mx-auto">
//         {/* Left Side */}
//         <div className="flex flex-col gap-6 w-full lg:w-1/2">
//           {dashboardItemsLeft.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => navigate(item.path)}
//               className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center gap-4"
//             >
//               {item.icon}
//               <p className="text-lg font-semibold text-gray-700">{item.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Right Side */}
//         <div className="flex flex-col gap-6 w-full lg:w-1/2">
//           {dashboardItemsRight.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => navigate(item.path)}
//               className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex items-center gap-4"
//             >
//               {item.icon}
//               <p className="text-lg font-semibold text-gray-700">{item.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaUserShield,
  FaBoxes,
  FaThList,
} from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const leftItems = [
    {
      label: "Add Product",
      icon: <FaPlusCircle size={24} className="text-indigo-600" />,
      path: "/admin/add-product",
    },
    {
      label: "View Products",
      icon: <FaClipboardList size={24} className="text-green-600" />,
      path: "/admin/view-products",
    },
    {
      label: "Users",
      icon: <FaUsers size={24} className="text-teal-600" />,
      path: "/admin/users",
    },
  ];

  const rightItems = [
    {
      label: "Add Category",
      icon: <FaThList size={24} className="text-orange-500" />,
      path: "/admin/add-category",
    },
    {
      label: "Orders",
      icon: <FaBoxes size={24} className="text-yellow-500" />,
      path: "/admin/orders",
    },
    {
      label: "Add Admin",
      icon: <FaUserShield size={24} className="text-blue-500" />,
      path: "/admin/add-admin",
    },
  ];

  const renderCard = (
    item: { label: string; icon: React.ReactElement; path: string },
    index: number
  ) => (
    <div
      key={index}
      onClick={() => navigate(item.path)}
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
    >
      <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
      <span className="text-lg font-medium text-gray-800">{item.label}</span>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Admin Control Panel
      </h1>

      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        {/* Left Section */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {leftItems.map(renderCard)}
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {rightItems.map(renderCard)}
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;

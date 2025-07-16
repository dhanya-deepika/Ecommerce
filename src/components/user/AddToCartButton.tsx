// import React, { useState } from "react";

// interface Props {
//   onAddToCart: () => void;
// }

// const AddToCartButton: React.FC<Props> = ({ onAddToCart }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
//     e.preventDefault(); // ✅ Prevent Link navigation
//     if (!expanded) {
//       onAddToCart();
//     }
//     setExpanded((prev) => !prev);
//   };
  

//   return (
//     <div
//       onClick={toggleExpand}
//       className={`absolute bottom-4 right-2 flex items-center justify-center
//         h-8 bg-red-600 text-white text-sm rounded-full transition-all duration-300 overflow-hidden cursor-pointer
//         ${expanded ? 'w-32 pr-4 pl-2 justify-start bg-red-700' : 'w-8'}
//       `}
//     >
//       <span className={`${expanded ? 'hidden' : 'block'}`}>+</span>
//       <span className={`${expanded ? 'block ml-2' : 'hidden'}`}>Add to cart</span>
//     </div>
//   );
// };
// export default AddToCartButton;

import React, { useState } from "react";
const AddToCartButton: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const addToCart = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: [{ productId: 1, quantity: 1 }],
        }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");
      const data = await response.json();
      console.log("Cart response:", data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const toggleExpand = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!expanded) {
      await addToCart(); 
    }
    setExpanded((prev) => !prev);
  };
  
  return (
    <div
      onClick={toggleExpand}
      className={`absolute bottom-4 right-2 flex items-center justify-center
        h-8 bg-red-600 text-white text-sm rounded-full transition-all duration-300 overflow-hidden cursor-pointer
        ${expanded ? "w-32 pr-4 pl-2 justify-start bg-red-700" : "w-8"}`}>
      <span className={`${expanded ? "hidden" : "block"}`}>+</span>
      <span className={`${expanded ? "block ml-2" : "hidden"}`}>Add to cart</span>
    </div>
  );
};

export default AddToCartButton;




import React, { useState } from "react";

interface Props {
  onAddToCart: () => void;
}

const AddToCartButton: React.FC<Props> = ({ onAddToCart }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // ✅ Prevent Link navigation
    if (!expanded) {
      onAddToCart();
    }
    setExpanded((prev) => !prev);
  };
  

  return (
    <div
      onClick={toggleExpand}
      className={`absolute bottom-4 right-2 flex items-center justify-center
        h-8 bg-red-600 text-white text-sm rounded-full transition-all duration-300 overflow-hidden cursor-pointer
        ${expanded ? 'w-32 pr-4 pl-2 justify-start bg-red-700' : 'w-8'}
      `}
    >
      <span className={`${expanded ? 'hidden' : 'block'}`}>+</span>
      <span className={`${expanded ? 'block ml-2' : 'hidden'}`}>Add to cart</span>
    </div>
  );
};

export default AddToCartButton;

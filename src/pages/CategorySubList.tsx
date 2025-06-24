import { useNavigate, useParams } from "react-router-dom";

const subcategories = {
  men: ["shirts", "pants", "watches"],
  women: ["sarees", "dresses", "jewellry"],
  kids: ["toys", "shirts", "footwear"],
};

const CategorySubList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const subs = subcategories[categoryName?.toLowerCase() as keyof typeof subcategories] || [];

  return (
<div className="container mx-auto mt-10 flex flex-col items-center gap-6">
  {subs.map((sub) => (
    <div
      key={sub}
      onClick={() => navigate(`/category/${categoryName}/${sub}`)}
      className="w-full sm:w-1/2 border p-6 shadow hover:scale-105 transition-transform duration-300 cursor-pointer rounded text-center"
    >
      <h3 className="text-xl capitalize font-semibold">{sub}</h3>
      <p className="text-sm text-gray-500">View All</p>
    </div>
  ))}
</div>

  );
};
export default CategorySubList;

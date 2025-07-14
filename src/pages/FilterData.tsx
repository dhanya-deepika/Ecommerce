import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../redux/store';
import noFileProImg from '../assets/images/noFilProImg.png';

const FilterData = () => {
  const filterProducts = useSelector((state: RootState) => state.products.filterData);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filterProducts.length > 0 ? (
        filterProducts.map((product: { id: string; image: string; name: string; price: number }) => (
          <Link
            to={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
            key={product.id}
          >
            <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => (e.currentTarget.src = noFileProImg)}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10 col-span-full">
          <img src={noFileProImg} alt="No products found" className="w-64 h-64 object-contain" />
          <p className="text-gray-500 mt-4 text-lg">No products match your search.</p>
        </div>
      )}
    </div>
  );
};
export default FilterData;

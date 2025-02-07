import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 ">
      <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-4">{product.name}</h2>
        <p className="text-3xl text-gray-600">${product.price}</p>
        {!isAuthenticated? (
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"><Link to="/register">Add to car</Link></button>
          ) : (
              <button className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>
              Add to Cart
              </button>
          )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
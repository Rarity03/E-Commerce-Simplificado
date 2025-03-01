import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function CarCard({ product, amount, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col md:flex-row items-center p-4 border border-gray-200 m-7">
      <Link to={`/product/${product._id}`}>
        <img className="h-48 w-48 object-cover" src={product.image} alt={product.name} />
      </Link>
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-3xl text-gray-600">${product.price}</p>
        <p className="text-lg text-gray-600">Cantidad: {amount}</p>
        <div className="mt-4 flex space-x-2">
          <button onClick={onIncrease} className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-300">+</button>
          <button onClick={onDecrease} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300">-</button>
          <button onClick={onRemove} className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 transition duration-300">Eliminar</button>
        </div>
      </div>
    </div>
  );
}

CarCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
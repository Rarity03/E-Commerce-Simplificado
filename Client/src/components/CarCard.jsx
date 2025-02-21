import PropTypes from 'prop-types';

export default function CarCard({ product }) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 ">
        <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-4">{product.name}</h2>
          <p className="text-3xl text-gray-600">${product.price}</p>
        </div>
      </div>
    );
  }


CarCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
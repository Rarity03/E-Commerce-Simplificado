import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCar } from '../context/CarContext';
import { useEffect, useState } from 'react';

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { addCar } = useCar()
  const [showNotification, setShowNotification] = useState(false);

  const handleSave = () => {
    // eslint-disable-next-line react/prop-types
    addCar(product._id, 1)
    setShowNotification(true);
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Ocultar la notificación después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 ">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-4">{product.name}</h2>
        <p className="text-3xl text-gray-600">${product.price}</p>
        { product.state === 'available' ? (
            !isAuthenticated? (
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"><Link to="/register">Add to car</Link></button>
            ) : (
                <button onClick={handleSave} className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>
                Add to Cart
                </button>
            )
        ):(
          <>
            <p className="text-sm text-red-600 mt-2">Out of Stock</p>
          </>
        )
        }
        
      </div>
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          Product added to cart
        </div>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
};
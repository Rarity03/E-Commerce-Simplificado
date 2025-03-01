import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCar } from '../context/CarContext';

export default function ProductPage() {
  const { id } = useParams();
  const { product, loading, getProduct } = useProduct();
  const { isAuthenticated } = useAuth();
    const { addCar } = useCar()

  const handleSave = () => {
    addCar(product._id, 1)
  }

  useEffect(() => {
    getProduct(id)
    console.log(product)
  }, []);

  return (
    <div className="container mx-auto p-4"> 
     {
        loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="loader">Loading...</div>
            </div>
        ) : (
            <div className='bg-white border border-gray-200 rounded-lg shadow-sm hover: hover:shadow-lg transition duration-300 flex flex-col md:flex-row'>
                <div className='w-full md:w-1/3 p-4 flex justify-center items-center'>
                    <img src={product.image} alt={product.name} className='w-full h-64 object-contain' />
                </div>
                <div className='w-full md:w-2/3 p-4'>
                    <h2 className = 'text-2xl font-semibold text-gray-900'>{product.name}</h2>
                    <p className='text-gray-700 text-base mt-4'>{product.description}</p>
                </div>
                <div className='w-full md:w-1/4 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                    <p className='text-3xl font-bold text-gray-800'>${product.price}</p>
                    { product.state === 'available' ? (
                        !isAuthenticated? (
                            <>
                                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"><Link to="/register">Add to car</Link></button>
                                <p className="text-sm text-green-600 mt-2">In Stock</p> 
                            </>
                        ) : (
                            <>
                                <button onClick={handleSave} className='mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>
                                Add to Cart
                                </button>
                                <p className="text-sm text-green-600 mt-2">In Stock</p>
                            </> 
                        )
                    ):(
                        <p className="text-sm text-red-600 mt-2">Out of Stock</p>
                    )}
                    
                </div>
            </div>
        )
     }
    </div>
  )
}


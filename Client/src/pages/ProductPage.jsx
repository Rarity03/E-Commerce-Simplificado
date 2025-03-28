import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCar } from '../context/CarContext';

export default function ProductPage() {
  const { id } = useParams();
  const { product, loading, getProduct } = useProduct();
  const { isAuthenticated } = useAuth();
  const { addCar } = useCar()
  const [reedMore, setReedMore] = useState(false)

  const handleSave = () => {
    addCar(product._id, 1)
  }

  useEffect(() => {
    getProduct(id)
  }, [id, reedMore]);


  return (
    <div className="container mx-auto p-4 mt-20"> 
     {
        loading || !product ? (
            <div className="flex justify-center items-center h-64">
                <div className="loader">Loading...</div>
            </div>
        ) : (
            <div className='bg-white border border-gray-200 rounded-lg shadow-sm hover: hover:shadow-lg transition duration-300 flex flex-col md:flex-row md:min-w-[1100px] min-w-[680px] overflow-x-auto'>
                <div className='w-full md:w-1/3 p-4 flex justify-center items-center'>
                    <img src={product.image} alt={product.name} className='w-full h-64 object-contain' />
                </div>
                <div className='w-full md:w-2/3 p-4'>
                    <h2 className = 'text-2xl font-semibold text-gray-900'>{product.name}</h2>
                    {
                        reedMore ? (
                            <>
                                <p className="text-gray-700 text-base mt-4">{product.description}</p>
                                <button
                                onClick={() => setReedMore(false)}
                                className="mt-2 px-4 py-2 text-blue-500 rounded hover:text-blue-600  transition duration-300"
                                >
                                Read less
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-700 text-base mt-4 line-clamp-4">{product.description}</p>
                                <button
                                onClick={() => setReedMore(true)}
                                className="mt-2 px-4 py-2 text-blue-500 rounded hover:text-blue-600  transition duration-300"
                                >
                                Read more
                                </button>
                            </>
                        )
                    }
                    
                </div>
                <div className='w-full md:w-1/4 p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                    <div className="flex items-center space-x-2">
                        <p className="text-3xl font-bold text-gray-800">${product.finalPrice}</p>
                            {
                                product.discount > 0 ? (
                                <>
                                <p className="text-base text-red-500 line-through">${product.discount}</p>
                                <p className="text-base text-red-500">of discount</p>
                                </>
                                ) : (
                                <></>
                                )
                            }
                    </div>
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


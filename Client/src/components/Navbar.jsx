import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { FaClipboardCheck, FaHome, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { IoLogOut, } from 'react-icons/io5'
import { useEffect, useState } from 'react';
import { useCar } from '../context/CarContext';
export default function Navbar(){
    const { isAuthenticated, logout, user } = useAuth()
    const { car, getCar, getCarCount, total} = useCar();
    const [showCart, setShowCart] = useState(false);
    const {setFilters} = useProduct()
    const location = useLocation();

    const handleNameChange = (e) => {
        setFilters((prevFilters) => ({ ...prevFilters, name: e.target.value }));
    };

    useEffect(() => {
        if (isAuthenticated) {
          getCar()
          getCarCount()
        }
    }, [showCart, isAuthenticated]);

    return (
        <nav className ="bg-gray-800 p-5 py-5 px-10 fixed top-0 w-full z-50 min-w-[1140px]">
            <div className='mx-auto flex justify-between items-center'>
                <div className='text-white text-4xl font-bold flex-shrink-0'>
                    <li><Link to="/">E-Commerce</Link></li>
                </div>
                {location.pathname === '/' && (
                    <div className="flex-grow mx-10 ">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleNameChange}
                        />
                    </div>
                )}
                <div>
                    <ul className='flex space-x-6 items-center'>
                        {isAuthenticated && <li className="text-white">Welcome {user.name}</li>}
                        <li><Link to="/" title="Home"className="text-white hover:text-gray-300 w-"><FaHome className="text-2xl" /></Link></li>
                        {!isAuthenticated && <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>}
                        {!isAuthenticated && <li><Link to="/register" className="text-white hover:text-gray-300">Register</Link></li>}
                        {isAuthenticated && <li><Link to="/profile" title="Profile" className="text-white hover:text-gray-300"><FaUser className="text-2xl" /></Link></li>}

                        {isAuthenticated && (
                            <li
                                onMouseEnter={() => setShowCart(true)}
                                onMouseLeave={() => setShowCart(false)}
                                className='relative'
                            >
                                <Link to="/car" on title="Car" className="text-white hover:text-gray-300">
                                    <FaCartShopping className="text-2xl" />
                                </Link>
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">{total}</span>
                                {showCart && (
                                    <div className="z-50 absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg ">
                                        <div className='grid grid-cols-2 gap-2 p-4 border-b'>
                                            <p className='font-bold'> Product </p>
                                            <p className='font-bold text-right'> Amount </p>
                                        </div>
                                        <ul className="p-4">
                                        {car &&  car.length > 0 ? (
                                            car.map((product) => (
                                            <li key={product.productId._id} className="flex justify-between items-center mb-2 p-2">
                                                <img src={product.productId.image} alt={product.productId.name} className="w-8 h-8 object-cover" />
                                                <span className='line-clamp-1'>{product.productId.name}</span>
                                                <span>{product.amount}</span>
                                            </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500 flex justify-center">No items in cart</li>
                                        )}
                                        </ul>
                                    </div>  
                                )}
                            </li>
                        )}
                        
                        {isAuthenticated && <li><Link to="/orders" title="Orders" className="text-white hover:text-gray-300"><FaClipboardCheck className="text-2xl" /></Link></li>}
                        {isAuthenticated && <li><button onClick={logout} title="Logout" className="text-white hover:text-gray-300"><IoLogOut  className="text-3xl mt-2" /></button></li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
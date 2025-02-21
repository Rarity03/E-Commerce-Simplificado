import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
//import { useState } from 'react';

export default function Navbar(){
    const { isAuthenticated, logout, user } = useAuth()
    const {setFilters} = useProduct()
    const location = useLocation();

    const handleNameChange = (e) => {
        setFilters((prevFilters) => ({ ...prevFilters, name: e.target.value }));
    };

    return (
        <nav className ="bg-gray-800 p-5 py-5 px-10">
            <div className='mx-auto flex justify-between items-center'>
                <div className='text-white text-4xl font-bold flex-shrink-0'>
                    <li><Link to="/">E-Commerce</Link></li>
                </div>
                {location.pathname === '/' && (
                    <div className="flex-grow mx-10">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={handleNameChange}
                        />
                    </div>
                )}
                <div>
                    <ul className='flex space-x-4 items-center'>
                        <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
                        {!isAuthenticated && <li><Link to="/login" className="text-white hover:text-gray-300">Login</Link></li>}
                        {!isAuthenticated && <li><Link to="/register" className="text-white hover:text-gray-300">Register</Link></li>}
                        {isAuthenticated && <li className="text-white">Welcome {user.name}</li>}
                        {isAuthenticated && <li><Link to="/profile" className="text-white hover:text-gray-300">Profile</Link></li>}
                        {isAuthenticated && <li><Link to="/car" className="text-white hover:text-gray-300">Car</Link></li>}
                        {isAuthenticated && <li><Link to="/orders" className="text-white hover:text-gray-300">Orders</Link></li>}
                        {isAuthenticated && <li><button onClick={logout} className="text-white hover:text-gray-300">Logout</button></li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
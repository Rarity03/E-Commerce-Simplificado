import { useState } from "react";
import { useProduct } from "../context/ProductContext";

export default function FilterOptions () {
    const {setFilters} = useProduct()
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [selectedState, setSelectedState] = useState('');
    
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setFilters((prevFilters) => ({ ...prevFilters, category: e.target.value }));
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        setFilters((prevFilters) => ({ ...prevFilters, minPrice: e.target.value }));
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        setFilters((prevFilters) => ({ ...prevFilters, maxPrice: e.target.value }));
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setFilters((prevFilters) => ({ ...prevFilters, state: e.target.value }));
    };

    return(
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Min Price</label>
                <input 
                    type="range"
                    min="0"
                    max="1500"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-full"
                />
                <span className="block text-gray-700 mt-2">${minPrice}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Max Price</label>
                <input
                    type="range"
                    min="0"
                    max="1500"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-full"
                />
                <span className="block text-gray-700 mt-2">${maxPrice}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Category</label>
                <ul className="space-y-2">
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="audio"
                                checked={selectedCategory === 'audio'}
                                onChange={handleCategoryChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Audio</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="mobile"
                                checked={selectedCategory === 'mobile'}
                                onChange={handleCategoryChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Mobile</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="tv"
                                checked={selectedCategory === 'tv'}
                                onChange={handleCategoryChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Tv</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="laptop"
                                checked={selectedCategory === 'laptop'}
                                onChange={handleCategoryChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Laptop</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value="appliances"
                                checked={selectedCategory === 'appliances'}
                                onChange={handleCategoryChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Appliances</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">State</label>
                <ul className="space-y-2">
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="state"
                                value="available"
                                checked={selectedState === 'available'}
                                onChange={handleStateChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Available</span>
                        </label>
                    </li>
                    <li>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="state"
                                value="not available"
                                checked={selectedState === 'not available'}
                                onChange={handleStateChange}
                                className="form-radio text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Not Available</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}
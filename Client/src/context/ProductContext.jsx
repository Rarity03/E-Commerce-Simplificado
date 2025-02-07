import { createContext, useContext, useState } from "react"
import { getProductsRequest , getProductRequest } from "../api/product"

export const ProductContext = createContext()

export const useProduct = () => {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider')
    }
    return context
}

// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 2000,
        category: '',
        state: '',
    });

    const getProducts = async () => {
        try {
            const response = await getProductsRequest(filters)
            setProducts(response.data)
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    const getProduct = async (id) => {
        try {
            const response = await getProductRequest(id)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ProductContext.Provider value={{
             products, 
             getProducts, 
             getProduct,
             setFilters,
             filters 
        }}>
            { children }
        </ProductContext.Provider>
    )
}

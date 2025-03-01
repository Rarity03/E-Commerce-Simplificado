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
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 2000,
        category: '',
        state: '',
    });

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await getProductsRequest(filters);
            setProducts(response.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const getProduct = async (id) => {
        setLoading(true);
        try {
            const response = await getProductRequest(id);
            setProduct(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{
             products, 
             product,
             loading,
             getProducts, 
             getProduct,
             setFilters,
             filters 
        }}>
            { children }
        </ProductContext.Provider>
    )
}

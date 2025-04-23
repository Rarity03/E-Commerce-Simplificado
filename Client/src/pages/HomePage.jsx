import { useEffect } from "react"
import { useProduct } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"
import FilterOptions from "../components/FilterOptions"

export default function HomePage() {

    const { getProducts, products, filters, setFilters} = useProduct()

    useEffect(() => {
        getProducts()
    },[filters])

    useEffect(() => {
      return () => {
        setFilters({
          minPrice: 0,
          maxPrice: 2000,
          category: '',
          state: '',
        });
      };
    }, [setFilters]);

    return (
      <>
        <div className="bg-slate-100 flex justify-between p-4 overflow-x-auto mt-20">
          <div className="w-1/4 p-4 min-w-[250px]">
            <FilterOptions />
          </div>
          <div className="flex-grow bg-slate-100 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4 min-w-[768px]">
          {products.length > 0 ? (
              products.map((product) => (
                  <ProductCard key={product._id} product={product} />
              ))
          ) : (
              <p>No products available</p>
          )}
          </div>
        </div>
      </>
      
    )
}
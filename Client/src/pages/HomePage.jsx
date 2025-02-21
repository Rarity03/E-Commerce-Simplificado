import { useEffect } from "react"
import { useProduct } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"
import FilterOptions from "../components/FilterOptions"

export default function HomePage() {

    const { getProducts, products, filters } = useProduct()

    useEffect(() => {
        getProducts()
    },[filters])

    return (
      <>
        <div className="bg-slate-100 grid-cols-2 flex justify-between p-4">
          <div className="w-1/4 p-4">
            <FilterOptions />
          </div>
          <div className="flex-grow bg-slate-100 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
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
import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useCar } from "../context/CarContext"
import CarCard from "../components/CarCard"

export default function CarPage() {
  const { user } = useAuth()
  const { car, getCar } = useCar()

  useEffect(() => {
    getCar(user)
  }, [])

    return (
      <>
        {
          car ? (
            car.products.map((product) => (
              <CarCard key={product._id} product={product} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <p className="text-2xl font-bold text-center text-gray-800" >El carrito está vacío.</p>
              </div>
            </div>
            
          )
        }
      </>
    )
}
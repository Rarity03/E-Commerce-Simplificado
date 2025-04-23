import { useEffect, useState } from "react";
//import { useAuth } from "../context/AuthContext";
import { useCar } from "../context/CarContext";
import CarCard from "../components/CarCard";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

export default function CarPage() {
  //const { user } = useAuth();
  const { car, getCar, addCar, removeCar, decreaseCar, deleteCar } = useCar();
  const { createOrder } = useOrder();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      await getCar();
      setLoading(false);
    };
    fetchCar();
  }, []);

  const handleIncrease = async (productId) => {
    await addCar(productId, 1);
  };

  const handleDecrease = async (productId) => {
    await decreaseCar(productId);
  };

  const handleRemove = async (productId) => {
    await removeCar(productId);
  };

  const handleOrder = async () => {
    try {
      await createOrder();
      navigate('/orders');
      await deleteCar();
    } catch (error) {
      console.error("Error creating order or deleting cart:", error);
    }
  }

  return (
    <div className="p-4 mt-20">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        car && car.length > 0 ? (
          <div className="min-w-[680px] overflow-x-auto">
            {
              car.map((product) => (
                <CarCard
                  key={product.productId._id}
                  product={product.productId}
                  amount={product.amount}
                  onIncrease={() => handleIncrease(product.productId._id)}
                  onDecrease={() => handleDecrease(product.productId._id)}
                  onRemove={() => handleRemove(product.productId._id)}
                />
              ))
            }
            <div className="mx-8 flex flex-row">
                <hr className="my-4"/>
                <p className="text-2xl font-bold mx-6">Total: ${car.reduce((acc, item) => acc + item.productId.price * item.amount, 0)}</p>
                <button onClick={handleOrder} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ">Comprar</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 border-2 border-dashed border-gray-300 rounded-lg min-w-[600px] overflow-x-auto">
            <p className="text-2xl font-bold">The cart is empty.</p>
          </div>
        )
      )}
    </div>
  );
}